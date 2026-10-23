<?php
if (!defined('ABSPATH')) exit;
function pid_uganda_setup(){load_theme_textdomain('pid-uganda',get_template_directory().'/languages');add_theme_support('title-tag');add_theme_support('post-thumbnails');add_theme_support('custom-logo',array('height'=>100,'width'=>240,'flex-height'=>true,'flex-width'=>true));add_theme_support('html5',array('search-form','comment-form','comment-list','gallery','caption','style','script'));register_nav_menus(array('primary'=>__('Primary Navigation','pid-uganda'),'footer'=>__('Footer Navigation','pid-uganda')));}
add_action('after_setup_theme','pid_uganda_setup');
function pid_uganda_assets(){wp_enqueue_style('pid-uganda-style',get_stylesheet_uri(),array(),'1.0.0');wp_enqueue_script('pid-uganda-navigation',get_template_directory_uri().'/assets/navigation.js',array(),'1.0.0',true);}
add_action('wp_enqueue_scripts','pid_uganda_assets');
function pid_uganda_register_content(){
  $types=array(
    'pid_program'=>array('PID Programmes','Programme','programmes','dashicons-groups'),
    'pid_package'=>array('PID Packages','Package','packages','dashicons-tickets-alt'),
    'pid_story'=>array('PID Stories','Story','stories','dashicons-edit-page'),
    'pid_testimonial'=>array('PID Testimonials','Testimonial','testimonials','dashicons-format-quote'),
    'pid_gallery'=>array('PID Gallery','Gallery Image','gallery','dashicons-format-gallery')
  );
  foreach($types as $key=>$t){register_post_type($key,array('labels'=>array('name'=>__($t[0],'pid-uganda'),'singular_name'=>__($t[1],'pid-uganda'),'add_new_item'=>sprintf(__('Add %s','pid-uganda'),$t[1])),'public'=>true,'has_archive'=>true,'show_in_rest'=>true,'menu_icon'=>$t[3],'rewrite'=>array('slug'=>$t[2]),'supports'=>array('title','editor','excerpt','thumbnail','revisions')));}
}
add_action('init','pid_uganda_register_content');
function pid_uganda_customize_register($c){
 $c->add_section('pid_home',array('title'=>__('PID Homepage','pid-uganda'),'priority'=>30));
 $fields=array(
 'pid_tagline'=>array('Website tagline','Empowering Grassroots Communities Through Sport, Health & Sustainable Livelihoods','text'),
 'pid_announcement'=>array('Registration / announcement line','Official Registered NGO Reg No: INDR177427311NB | Kitintale, Kampala','text'),
 'pid_hero_title'=>array('Hero heading','Empowering Grassroots Communities in Uganda Through Sports, Health & Sustainable Livelihoods','text'),
 'pid_hero_description'=>array('Hero description','Partnership for Integrated Development Uganda (PID) is a registered NGO dedicated to improving lives of vulnerable youth, children, and women through community-led solutions.','textarea'),
 'pid_hero_image'=>array('Hero image URL','', 'url'),
 'pid_about_image'=>array('About image URL','', 'url'),
 'pid_about_title'=>array('About heading','About PID Uganda','text'),
 'pid_about_text'=>array('About text','Established in 2010 in Kitintale, Kampala, PID works with local leaders, schools and families.','textarea'),
 'pid_contact_email'=>array('Contact email','info@piduganda.org','text'),
 'pid_contact_phone'=>array('Contact phone','+256 776 526 344','text'),
 'pid_contact_location'=>array('Contact location','Kitintale, Kampala, Uganda','text'));
 foreach($fields as $id=>$f){$c->add_setting($id,array('default'=>$f[1],'sanitize_callback'=>$f[2]==='url'?'esc_url_raw':($f[2]==='textarea'?'sanitize_textarea_field':'sanitize_text_field')));$c->add_control($id,array('label'=>__($f[0],'pid-uganda'),'section'=>'pid_home','type'=>$f[2]));}
}
add_action('customize_register','pid_uganda_customize_register');
function pid_uganda_import_menu(){add_theme_page(__('PID Content Import','pid-uganda'),__('PID Content Import','pid-uganda'),'manage_options','pid-content-import','pid_uganda_import_page');}
add_action('admin_menu','pid_uganda_import_menu');
function pid_uganda_import_items($items,$type,$kind){
 $count=0;
 foreach($items as $item){
  if(!is_array($item))continue;
  $title=sanitize_text_field($item['title']??$item['caption']??$item['name']??'');
  if($title==='')continue;
  $source=sanitize_key($item['id']??sanitize_title($title));
  $existing=get_posts(array('post_type'=>$type,'post_status'=>'any','meta_key'=>'_pid_source_id','meta_value'=>$source,'numberposts'=>1));
  $body=$item['description']??$item['summary']??$item['comment']??$item['caption']??'';
  if($kind==='package')$body=trim(($item['description']??'')."\n\n".($item['duration']??'')." | ".($item['location']??'')." | ".(isset($item['cost'])?strval($item['cost']):''));
  if($kind==='testimonial')$body=($item['comment']??'')."\n\n".($item['role']??'');
  if($kind==='story')$body=($item['summary']??'')."\n\n".('Author: '.($item['author']??''))." | ".($item['date']??'');
  $p=array('post_type'=>$type,'post_status'=>'publish','post_title'=>$title,'post_content'=>wp_kses_post(wpautop($body)),'post_excerpt'=>sanitize_text_field($item['category']??$item['type']??$item['role']??''));
  if($existing)$p['ID']=$existing[0]->ID;
  $id=wp_insert_post($p,true);
  if(!is_wp_error($id)){update_post_meta($id,'_pid_source_id',$source);update_post_meta($id,'_pid_imported_record',wp_json_encode($item));foreach(array('category','type','duration','location','cost','author','date','readTime','url','role','avatar','image','icon') as $k)if(isset($item[$k])&&is_scalar($item[$k]))update_post_meta($id,'_pid_'.$k,sanitize_text_field((string)$item[$k]));$count++;}
 }
 return $count;
}
function pid_uganda_import_page(){
 if(!current_user_can('manage_options'))return;$message='';
 if(isset($_POST['pid_import_nonce'])&&wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['pid_import_nonce'])),'pid_import_content')&&!empty($_FILES['pid_json']['tmp_name'])){
  $f=$_FILES['pid_json'];
  if(!empty($f['error'])||!is_uploaded_file($f['tmp_name'])||strtolower(pathinfo($f['name'],PATHINFO_EXTENSION))!=='json'||(int)$f['size']>5*MB_IN_BYTES)$message='Upload a valid JSON file smaller than 5 MB.';
  else{
   $data=json_decode(file_get_contents($f['tmp_name']),true);
   if(!is_array($data))$message='Invalid JSON. Upload src/config/siteContent.json from the original repository.';
   else{
    $counts=array();
    $counts['programmes']=pid_uganda_import_items($data['services']??array(),'pid_program','program');
    $counts['packages']=pid_uganda_import_items($data['packages']??array(),'pid_package','package');
    $counts['stories']=pid_uganda_import_items($data['blogPosts']??array(),'pid_story','story');
    $counts['testimonials']=pid_uganda_import_items($data['testimonials']??array(),'pid_testimonial','testimonial');
    $counts['gallery']=pid_uganda_import_items($data['galleryImages']??array(),'pid_gallery','gallery');
    update_option('pid_uganda_imported_site_content',array_intersect_key($data,array_flip(array('siteSettings','seoSettings','pageHero','pageAbout','pagePillars','pageImpact','pagePartners','pageOpportunities','contactInfo'))),false);
    $settings=$data['siteSettings']??array();
    if(!empty($settings['siteTitle']))update_option('blogname',sanitize_text_field($settings['siteTitle']));
    if(!empty($settings['siteTagline']))set_theme_mod('pid_tagline',sanitize_text_field($settings['siteTagline']));
    if(!empty($settings['announcementText']))set_theme_mod('pid_announcement',sanitize_text_field($settings['announcementText']));
    $hero=$data['pageHero']??array();
    if(!empty($hero['heroTitle1'])||!empty($hero['heroTitle2']))set_theme_mod('pid_hero_title',sanitize_text_field(trim(($hero['heroTitle1']??'').' '.str_replace(array('{','}'),'',$hero['heroTitle2']??''))));
    if(!empty($hero['heroDescription']))set_theme_mod('pid_hero_description',sanitize_textarea_field($hero['heroDescription']));
    $about=$data['pageAbout']??array();
    if(!empty($about['aboutTitle']))set_theme_mod('pid_about_title',sanitize_text_field($about['aboutTitle']));
    if(!empty($about['aboutParagraph1'])||!empty($about['aboutParagraph2']))set_theme_mod('pid_about_text',sanitize_textarea_field(trim(($about['aboutParagraph1']??'')."\n\n".($about['aboutParagraph2']??''))));
    $contact=$data['contactInfo']??array();
    if(!empty($contact['contactEmail']))set_theme_mod('pid_contact_email',sanitize_email($contact['contactEmail']));
    if(!empty($contact['contactPhone']))set_theme_mod('pid_contact_phone',sanitize_text_field($contact['contactPhone']));
    if(!empty($contact['contactAddress']))set_theme_mod('pid_contact_location',sanitize_text_field($contact['contactAddress']));
    $message='Import complete. '.implode(', ',array_map(function($k,$v){return $k.': '.$v;},array_keys($counts),array_values($counts))).'. Section and SEO settings are saved for reference; review and apply SEO metadata in WordPress. Image files still need to be uploaded to Media Library and assigned before launch.';
   }
  }
 }
 echo '<div class="wrap"><h1>PID Uganda Content Import</h1><p>Upload src/config/siteContent.json from GitHub. Repeat imports update matching records rather than duplicating them. Imported sections and SEO settings are also stored in WordPress options. This does not change DNS or the live site.</p>';
 if($message)echo '<div class="notice notice-info"><p>'.esc_html($message).'</p></div>';
 echo '<form method="post" enctype="multipart/form-data">';wp_nonce_field('pid_import_content','pid_import_nonce');echo '<input type="file" name="pid_json" accept=".json,application/json" required> ';submit_button('Import PID Content','primary','submit',false);echo '</form><p>Back up WordPress first. Upload the original images into Media Library and test all imported records before launch.</p></div>';
}

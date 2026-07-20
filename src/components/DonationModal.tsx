import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  X, 
  Heart, 
  CreditCard, 
  Phone, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  ArrowLeft, 
  Coins, 
  Copy, 
  Check, 
  Upload, 
  ShieldAlert, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { ORG_INFO } from '../data';
import { Language } from '../translations';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type Step = 'options' | 'details' | 'payment' | 'processing' | 'success';
type PaymentMethod = 'momo' | 'card' | 'bank';

export default function DonationModal({ isOpen, onClose, language }: DonationModalProps) {
  const [step, setStep] = useState<Step>('options');
  const [frequency, setFrequency] = useState<'once' | 'monthly' | 'annual'>('once');
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  
  // Donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  
  // Payment specifics
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'airtel'>('mtn');
  
  // Card details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Bank transfer specifics
  const [copiedBank, setCopiedBank] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptFileName, setReceiptFileName] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Transaction Reference
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const presets = [10, 25, 50, 100, 250];

  const usdToUgx = 3700; // Estimated exchange rate for clear context
  const getUgxValue = (usdVal: number) => {
    return (usdVal * usdToUgx).toLocaleString();
  };

  const getImpactDescription = (usdVal: number) => {
    if (usdVal <= 15) {
      return language === 'en' 
        ? 'Supplies a local youth with professional athletic gear and educational stationery.' 
        : 'Eguulira omuvubuka eby’emizannyo n’ebitabo by’okusoma.';
    } else if (usdVal <= 30) {
      return language === 'en'
        ? 'Funds an entire community sports-for-development training session or agricultural seed clinic.'
        : 'Etuusa nteekateeka y’emizannyo n’okusimba emiti mu kyalo kyonna.';
    } else if (usdVal <= 75) {
      return language === 'en'
        ? 'Procures standard school kits and learning aids for 5 underprivileged local students.'
        : 'Eguulira abayizi abasomi bataano eby’okusoma ebijjuvu.';
    } else if (usdVal <= 150) {
      return language === 'en'
        ? 'Directly funds local water well pump maintenance or buys high-yield organic seedlings.'
        : 'Eyamba ku kulabirira n’okukanika ebidiba by’amazzi amayonjo mu kitundu.';
    } else {
      return language === 'en'
        ? 'Supports major structural improvements, vocational training workshops, and multi-district tournaments.'
        : 'Ewagira nteekateeka z’eby’emikono n’amasomo amanene mu disitulikiti zonna.';
    }
  };

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setIsCustom(false);
    setCustomAmount('');
    if (errors.amount) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    } else {
      setAmount(0);
    }
  };

  const validateOptions = () => {
    const err: Record<string, string> = {};
    if (amount <= 0) {
      err.amount = language === 'en' ? 'Please select or enter a valid donation amount.' : 'Saba olonde oba owandike omuwendo omutuufu.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateDetails = () => {
    const err: Record<string, string> = {};
    if (!donorName.trim()) {
      err.name = language === 'en' ? 'Full Name is required' : 'Erinnya lyona lyetaagibwa';
    }
    if (!donorEmail.trim()) {
      err.email = language === 'en' ? 'Email is required' : 'Email Address eyetaagibwa';
    } else if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      err.email = language === 'en' ? 'Invalid email format' : 'Email tennatuuka bulungi';
    }
    if (!donorPhone.trim()) {
      err.phone = language === 'en' ? 'Phone number is required' : 'Enamba y’essimu eyetaagibwa';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validatePayment = () => {
    const err: Record<string, string> = {};
    if (paymentMethod === 'card') {
      if (!cardName.trim()) err.cardName = language === 'en' ? 'Cardholder Name is required' : 'Erinnya ku kadi lyetaagibwa';
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
        err.cardNumber = language === 'en' ? 'Enter a valid 16-digit card number' : 'Enyinniza ennamba ya kadi entuufu';
      }
      if (!cardExpiry.trim()) {
        err.cardExpiry = language === 'en' ? 'Required' : 'Lyetaagibwa';
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        err.cardCvv = language === 'en' ? 'Required (3 digits)' : 'Namba ya CVV';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const triggerProcessPayment = () => {
    setStep('processing');
    
    // Generate a beautiful unique transaction ID
    const ref = `PID-TX-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);

    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText('Centenary Bank, Acc: 3100049285, Plan Integral Development Ltd, Kitintale Branch');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      setReceiptFileName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn" id="donation-modal-wrapper">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header decoration band */}
        <div className="h-2 bg-[#0f594b] w-full" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-50 rounded-xl text-[#0f594b]">
              <Heart className="w-5 h-5 fill-current animate-pulse text-emerald-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                {language === 'en' ? 'Support Our Mission' : 'Yamba ku Kigendererwa Kyaffe'}
              </h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Plan Integral Development (PID) Uganda
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-slate-100 h-1.5 w-full flex">
          <div className={`h-full bg-emerald-600 transition-all duration-300 ${
            step === 'options' ? 'w-1/4' :
            step === 'details' ? 'w-2/4' :
            step === 'payment' ? 'w-3/4' : 'w-full'
          }`} />
        </div>

        {/* Modal Body (Scrollable if content overflows) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: OPTIONS */}
          {step === 'options' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-1">
                <h4 className="font-display font-bold text-sm text-slate-800">
                  {language === 'en' ? 'Select Donation Frequency & Amount' : 'Londa omulundi gw’owaayo n’omuwendo'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'Your tax-deductible contribution directly funds school materials, athletic gear, and local sustainable farming.' : 'Obuyambi bwo bugenda butereevu mu bitabo by’abayizi, emizannyo, n’obulimi mu byalo.'}
                </p>
              </div>

              {/* Frequency Selector */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {(['once', 'monthly', 'annual'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      frequency === freq
                        ? 'bg-white text-[#0f594b] shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {freq === 'once' ? (language === 'en' ? 'Give Once' : 'Ggaba omulundi gumu') :
                     freq === 'monthly' ? (language === 'en' ? 'Monthly' : 'Buli mwezi') :
                     (language === 'en' ? 'Annually' : 'Buli mwaka')}
                  </button>
                ))}
              </div>

              {/* Amount Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePresetSelect(preset)}
                      className={`py-3 px-1 rounded-xl text-xs font-mono font-bold transition-all border text-center cursor-pointer flex flex-col justify-center items-center ${
                        amount === preset && !isCustom
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-sm">${preset}</span>
                      <span className="text-[8px] text-slate-400 font-normal mt-0.5">UGX {getUgxValue(preset)}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-xs font-mono font-bold">$</span>
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full pl-8 pr-28 py-3 text-xs font-mono bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                      errors.amount ? 'border-red-400' : 'border-slate-200'
                    }`}
                    placeholder={language === 'en' ? 'Custom Amount (USD)' : 'Omuwendo omulala'}
                    min="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {amount > 0 ? `~ UGX ${getUgxValue(amount)}` : ''}
                    </span>
                  </div>
                </div>
                {errors.amount && (
                  <p className="text-[10px] text-red-500 font-semibold">{errors.amount}</p>
                )}
              </div>

              {/* Impact Card */}
              {amount > 0 && (
                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-start space-x-3">
                  <Coins className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-[#0f594b]">
                      {language === 'en' ? 'Projected Support Impact' : 'Obuyambi Buno Kye Bugenda Okukola'}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {getImpactDescription(amount)}
                    </p>
                  </div>
                </div>
              )}

              {/* Trust Badge */}
              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>{language === 'en' ? 'Secure 256-bit encrypted giving platform.' : 'Enkola y’okusonda ensimbi ekumiddwa bulungi.'}</span>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  if (validateOptions()) {
                    setStep('details');
                  }
                }}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
              >
                <span>{language === 'en' ? 'Continue' : 'Genda mu Maaso'}</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>
          )}

          {/* STEP 2: DONOR DETAILS */}
          {step === 'details' && (
            <div className="space-y-5 animate-fadeIn">
              <button 
                onClick={() => setStep('options')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#0f594b] font-semibold hover:underline cursor-pointer mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Change amount' : 'Kuba nkyukakyuka'}</span>
              </button>

              <div className="text-center space-y-1">
                <h4 className="font-display font-bold text-sm text-slate-800">
                  {language === 'en' ? 'Donor Identification Information' : 'Ebiwandiiko by’Omuwi w’Obuyambi'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' 
                    ? 'Please provide your basic contact information to generate your official PID Uganda tax-deductible receipt.' 
                    : 'Wandika ebikukwatako okusobola okukola risiti yo eya PID Uganda ey’amateeka.'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {language === 'en' ? 'Full Name *' : 'Erinnya lyona *'}
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                      errors.name ? 'border-red-400' : 'border-slate-200'
                    }`}
                    placeholder="Sarah Nakato"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {language === 'en' ? 'Email Address *' : 'Endagiriro ya Email *'}
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                      errors.email ? 'border-red-400' : 'border-slate-200'
                    }`}
                    placeholder="sarah.nakato@gmail.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {language === 'en' ? 'Phone Number (For Mobile Money billing) *' : 'Enamba y’essimu (eya Mobile Money) *'}
                  </label>
                  <input
                    type="text"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                      errors.phone ? 'border-red-400' : 'border-slate-200'
                    }`}
                    placeholder="077XXXXXXX / 070XXXXXXX"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  if (validateDetails()) {
                    setStep('payment');
                  }
                }}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
              >
                <span>{language === 'en' ? 'Proceed to Payment' : 'Genda ku By’okusasula'}</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD SELECTOR & DETAIL SUBMISSIONS */}
          {step === 'payment' && (
            <div className="space-y-5 animate-fadeIn">
              <button 
                onClick={() => setStep('details')}
                className="inline-flex items-center space-x-1.5 text-xs text-[#0f594b] font-semibold hover:underline cursor-pointer mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Donor details' : 'Ddayo emabega'}</span>
              </button>

              <div className="text-center space-y-1">
                <h4 className="font-display font-bold text-sm text-slate-800">
                  {language === 'en' ? 'Secure Payment Channel' : 'Enkola ey’okusasula ey’obukuumi'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' 
                    ? `Donating: $${amount} USD (~ UGX ${getUgxValue(amount)})` 
                    : `Obuyambi bwo: $${amount} USD (~ UGX ${getUgxValue(amount)})`}
                </p>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    setPaymentMethod('momo');
                    setErrors({});
                  }}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'momo' ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/50' : 'text-slate-500'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Mobile Money</span>
                </button>

                <button
                  onClick={() => {
                    setPaymentMethod('card');
                    setErrors({});
                  }}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/50' : 'text-slate-500'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / Visa</span>
                </button>

                <button
                  onClick={() => {
                    setPaymentMethod('bank');
                    setErrors({});
                  }}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg flex flex-col items-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'bank' ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200/50' : 'text-slate-500'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Bank Wire</span>
                </button>
              </div>

              {/* PAYMENT DETAILS SECTION BASED ON METHOD */}
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl">
                
                {/* MOBILE MONEY */}
                {paymentMethod === 'momo' && (
                  <div className="space-y-4">
                    <div className="text-center pb-2 border-b border-slate-200/50">
                      <p className="text-xs text-slate-600">
                        {language === 'en' 
                          ? 'Enter your mobile number to trigger a standard network USSD prompt to authorize your donation securely.' 
                          : 'Yinjiza ennamba yo eya mobile money okusobola okutandika nteekateeka ey’okusaasula mu mbeera ey’obukuumi.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono block">
                        {language === 'en' ? 'Select Network Provider' : 'Londa Omukutu gw’essimu'}
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setMomoProvider('mtn')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            momoProvider === 'mtn' 
                              ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="text-xs">MTN MoMo</span>
                          </div>
                          {momoProvider === 'mtn' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setMomoProvider('airtel')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            momoProvider === 'airtel' 
                              ? 'bg-red-50 border-red-500 text-red-950 font-bold' 
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="text-xs">Airtel Money</span>
                          </div>
                          {momoProvider === 'airtel' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">
                        {language === 'en' ? 'Mobile Money Number' : 'Enamba Y’essimu Ensaasuzi'}
                      </label>
                      <input
                        type="text"
                        value={donorPhone}
                        disabled={true}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 text-slate-500 rounded-xl font-mono cursor-not-allowed"
                      />
                      <span className="text-[10px] text-slate-400 block italic">
                        {language === 'en' ? 'Inherited from your previous step for precision.' : 'Ejiddwa mu kitundu eky’emabega okuluhhamya.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* CREDIT CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">
                        {language === 'en' ? 'Cardholder Name *' : 'Erinnya ku Kadi *'}
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                          errors.cardName ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="Sarah Nakato"
                      />
                      {errors.cardName && <p className="text-[9px] text-red-500 font-semibold">{errors.cardName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">
                        {language === 'en' ? 'Card Number *' : 'Enamba ya Kadi *'}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          // Standard format card spaced spacing
                          const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const matches = v.match(/\d{4,16}/g);
                          const match = (matches && matches[0]) || '';
                          const parts = [];
                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4));
                          }
                          if (parts.length > 0) {
                            setCardNumber(parts.join(' '));
                          } else {
                            setCardNumber(v);
                          }
                        }}
                        maxLength={19}
                        className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                          errors.cardNumber ? 'border-red-400' : 'border-slate-200'
                        }`}
                        placeholder="4111 2222 3333 4444"
                      />
                      {errors.cardNumber && <p className="text-[9px] text-red-500 font-semibold">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          {language === 'en' ? 'Expiry (MM/YY) *' : 'Omwezi/Omwaka *'}
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
                            if (v.length >= 2) {
                              setCardExpiry(`${v.substring(0, 2)}/${v.substring(2, 4)}`);
                            } else {
                              setCardExpiry(v);
                            }
                          }}
                          maxLength={5}
                          className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                            errors.cardExpiry ? 'border-red-400' : 'border-slate-200'
                          }`}
                          placeholder="12/28"
                        />
                        {errors.cardExpiry && <p className="text-[9px] text-red-500 font-semibold">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          CVV *
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          maxLength={3}
                          className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0f594b] ${
                            errors.cardCvv ? 'border-red-400' : 'border-slate-200'
                          }`}
                          placeholder="123"
                        />
                        {errors.cardCvv && <p className="text-[9px] text-red-500 font-semibold">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* BANK TRANSFER WIRE */}
                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div className="space-y-1 pb-3 border-b border-slate-200/50">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Official PID Bank Coordinates</span>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                        <p className="font-bold text-[#0f594b]">Bank: Centenary Bank Uganda</p>
                        <p>Account Name: Plan Integral Development Ltd</p>
                        <p>Account No: 3100049285</p>
                        <p>Branch: Kitintale Branch</p>
                        <p>Swift Code: CENBUGKAMP</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleCopyBank}
                        className="mt-2.5 w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-mono text-slate-600 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                      >
                        {copiedBank ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === 'en' ? 'Copied Coordinates!' : 'Bikoppiddwa!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{language === 'en' ? 'Copy Bank details' : 'Koppa Ebikwatako'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Receipt Upload */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-slate-700 block">
                        {language === 'en' ? 'Upload Receipt / Proof of Transfer (Optional)' : 'Teekako Risiti oba Obujulizi Obulala (Sikyetaagibwa nnyo)'}
                      </span>
                      
                      <div className="relative border-2 border-dashed border-slate-200 hover:border-[#0f594b] transition-all rounded-xl p-4 text-center bg-white cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#0f594b] mx-auto mb-1.5 transition-colors" />
                        <span className="text-[10px] font-bold text-[#0f594b] block">
                          {receiptFileName ? receiptFileName : (language === 'en' ? 'Choose receipt file or drag here' : 'Londa omukutu guno')}
                        </span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">
                          PDF, PNG, JPG (Max 5MB)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Security Shield Info */}
              <div className="bg-[#08231d] text-white p-3.5 rounded-2xl flex items-center space-x-3 border border-[#0d4035]">
                <ShieldAlert className="w-4 h-4 text-gold-400 flex-shrink-0 animate-pulse" />
                <p className="text-[10px] text-slate-300 leading-normal">
                  {language === 'en' 
                    ? 'Payments are securely routed via compliant local partners ensuring compliance with statutory financial guidelines of the NGO Act CAP 109.' 
                    : 'Ensaasula eno egenda butereevu mu bitongole ebikkiriziddwa mu mateeka agafuga eby’ensimbi (NGO Act CAP 109).'}
                </p>
              </div>

              {/* Complete Action Button */}
              <button
                onClick={() => {
                  if (validatePayment()) {
                    triggerProcessPayment();
                  }
                }}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
              >
                <Heart className="w-4 h-4 text-gold-500 fill-current" />
                <span>
                  {paymentMethod === 'bank' 
                    ? (language === 'en' ? 'Confirm Pledge & Support' : 'Kakasiza nti Owaayo') 
                    : (language === 'en' ? `Authorize $${amount} USD Donation` : `Kakasiza Obuyambi bwa $${amount}`)}
                </span>
              </button>
            </div>
          )}

          {/* STEP 4: PROCESSING SANDBOX ANIMATION */}
          {step === 'processing' && (
            <div className="py-12 space-y-6 text-center animate-fadeIn">
              <div className="relative w-20 h-20 mx-auto">
                {/* Spinner */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                <div className="absolute inset-0 rounded-full border-4 border-t-[#0f594b] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                <Heart className="absolute inset-0 m-auto w-8 h-8 text-rose-500 fill-current animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-base text-slate-800">
                  {paymentMethod === 'momo' ? (language === 'en' ? 'Triggering MoMo Push Prompt...' : 'Weereza obusubaka bwa MoMo...') :
                   paymentMethod === 'card' ? (language === 'en' ? 'Encrypting Secure Card Credentials...' : 'Wandiika ennamba ya kadi emanyiddwa...') :
                   (language === 'en' ? 'Registering Wire Pledge...' : 'Okukubaganya obuyambi bwa banka...')}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {paymentMethod === 'momo' ? (language === 'en' ? `Please check your phone (${donorPhone}) for an incoming USSD PIN prompt to approve the $${amount} (UGX ${getUgxValue(amount)}) transaction. Do not close this window.` : `Saba wetegereze essimu yo mu bwangu (${donorPhone}) ojje okakasize omulundi guno omuwendo gwa $${amount} (UGX ${getUgxValue(amount)}) mu ngeri ey’obukuumi.`) :
                   paymentMethod === 'card' ? (language === 'en' ? 'Handshaking securely with international standard financial gateway servers. Please wait...' : 'Tukwasaganya ensaasula yo ne gateway z’amateeka. Linda katono...') :
                   (language === 'en' ? 'Creating a direct ledger registration record for your voluntary bank deposit pledge. Thank you.' : 'Tukukoledde bbaluwa enkulu egenda okukola ku mbalirira yo.')}
                </p>
              </div>

              {/* Progress bar simulation */}
              <div className="w-full max-w-xs mx-auto bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full animate-progress" style={{ width: '45%' }} />
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {step === 'success' && (
            <div className="text-center space-y-6 py-6 animate-scaleUp">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-9 h-9 text-emerald-500" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-gold-600 bg-gold-100 px-3 py-1 rounded-full uppercase tracking-widest border border-gold-400/25">
                  {language === 'en' ? 'Donation Approved' : 'Obuyambi Bukakasiddwa'}
                </span>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-2">
                  {language === 'en' ? 'Apwoyo Mate! Webale Nnyo!' : 'Apwoyo Mate! Webale Nnyo!'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {language === 'en' 
                    ? `Thank you, ${donorName}. Your contribution of $${amount} USD (~ UGX ${getUgxValue(amount)}) has been successfully registered to sustain PID programs.` 
                    : `Weebale nnyo, ${donorName}. Obuyambi bwo obwa $${amount} USD (~ UGX ${getUgxValue(amount)}) bufubiddwa era bugenda butereevu ku nteekateeka zaffe.`}
                </p>
              </div>

              {/* Receipt card download */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 text-left space-y-3 font-mono text-[11px] text-slate-600">
                <div className="flex justify-between pb-2 border-b border-slate-200/50">
                  <span className="font-sans font-semibold text-slate-700">{language === 'en' ? 'Transaction Receipt' : 'Risiti Y’okussaasula'}</span>
                  <span className="text-emerald-700 font-bold">{referenceId}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Donor:' : 'Omugabi:'}</span>
                    <span className="font-bold text-slate-800">{donorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Amount Received:' : 'Omuwendo Gwe Tufunye:'}</span>
                    <span className="font-bold text-slate-800">${amount} USD / UGX {getUgxValue(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Frequency:' : 'Omulundi:'}</span>
                    <span className="font-bold text-slate-800 uppercase">{frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Payment Channel:' : 'Enkola Y’okusasulilamo:'}</span>
                    <span className="font-bold text-slate-800 uppercase">{paymentMethod}</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-900/90 p-2.5 rounded-xl text-[10px] font-sans leading-relaxed border border-emerald-100">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 inline-block mr-1.5 align-text-bottom" />
                  <span className="font-semibold">
                    {language === 'en' 
                      ? 'A certified copy of this tax-deductible donation receipt has been sent to your email.' 
                      : 'Kopi ya risiti eno ereeza mu email yo gye watuwadde.'}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#0f594b] hover:bg-emerald-800 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                {language === 'en' ? 'Back to Portal' : 'Ggalawo obuyambi'}
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer decoration */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 px-6 sm:px-8">
          <span className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5" />
            <span>PID Uganda Secretariat</span>
          </span>
          <span>{ORG_INFO.registrationNo}</span>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { LeadFormData } from '@/types';
import { villas } from '@/lib/villas-data';
import { captureUTMParams, submitLead } from '@/lib/lead-submission';
import WizardStepIndicator from './steps/WizardStepIndicator';
import WizardProgressBar from './steps/WizardProgressBar';
import WizardSummaryBar from './steps/WizardSummaryBar';
import StepDates from './steps/StepDates';
import StepGuests from './steps/StepGuests';
import StepVillaSelection from './steps/StepVillaSelection';
import StepContact from './steps/StepContact';

// ─── Types ───────────────────────────────────────
export type WizardStep = 1 | 2 | 3 | 4;

interface WizardState {
  step: WizardStep;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedVilla: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  marketingConsent: boolean;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

type WizardAction =
  | { type: 'SET_FIELD'; field: string; value: string | number | boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: WizardStep }
  | { type: 'SET_UTM'; params: Partial<LeadFormData> }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string };

// ─── Reducer ─────────────────────────────────────
function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'NEXT_STEP':
      return state.step < 4 ? { ...state, step: (state.step + 1) as WizardStep } : state;
    case 'PREV_STEP':
      return state.step > 1 ? { ...state, step: (state.step - 1) as WizardStep } : state;
    case 'GO_TO_STEP':
      return { ...state, step: action.step };
    case 'SET_UTM':
      return { ...state, ...action.params };
    case 'SUBMIT_START':
      return { ...state, submitting: true, error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting: false, submitted: true };
    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, error: action.error };
    default:
      return state;
  }
}

// ─── Validation ──────────────────────────────────
function canProceed(state: WizardState): boolean {
  switch (state.step) {
    case 1:
      return !!(state.checkIn && state.checkOut && state.checkOut > state.checkIn);
    case 2:
      return state.adults >= 1;
    case 3:
      return !!state.selectedVilla;
    case 4:
      return !!(state.firstName && state.lastName && state.email);
    default:
      return false;
  }
}

// ─── Step Headlines ──────────────────────────────
const stepHeadlines: Record<WizardStep, string> = {
  1: 'When Will You Arrive?',
  2: "Who's Joining You?",
  3: 'Select Your Sanctuary',
  4: 'Almost There',
};

const nextLabels: Record<WizardStep, string> = {
  1: 'Proceed to Guests',
  2: 'Proceed to Villa Selection',
  3: 'Proceed to Contact',
  4: 'Submit Enquiry',
};

// ─── Props ───────────────────────────────────────
interface BookingWizardProps {
  preselectedVilla?: string;
  source?: string;
  onClose?: () => void;
}

export default function BookingWizard({ preselectedVilla, source = 'website', onClose }: BookingWizardProps) {
  const initialStep: WizardStep = preselectedVilla && villas.some((v) => v.id === preselectedVilla) ? 4 : 1;

  const [state, dispatch] = useReducer(wizardReducer, {
    step: initialStep,
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    selectedVilla: preselectedVilla || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    marketingConsent: false,
    submitting: false,
    submitted: false,
    error: null,
  });

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // UTM capture
  useEffect(() => {
    dispatch({ type: 'SET_UTM', params: captureUTMParams(source) });
  }, [source]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const setField = useCallback((field: string, value: string | number | boolean) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const handleNext = useCallback(() => {
    if (state.step === 4) {
      handleSubmit();
    } else {
      dispatch({ type: 'NEXT_STEP' });
    }
  }, [state.step]);

  const handleSubmit = async () => {
    dispatch({ type: 'SUBMIT_START' });
    const formData: Partial<LeadFormData> = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phone: state.phone,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      villaPreference: state.selectedVilla,
      adults: state.adults,
      children: state.children,
      specialRequests: state.specialRequests,
      marketingConsent: state.marketingConsent,
      gclid: state.gclid,
      utm_source: state.utm_source,
      utm_medium: state.utm_medium,
      utm_campaign: state.utm_campaign,
      utm_term: state.utm_term,
    };
    const result = await submitLead(formData);
    if (result.success) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } else {
      dispatch({ type: 'SUBMIT_ERROR', error: result.error || 'Something went wrong' });
    }
  };

  // ─── Success screen ────────────────────────────
  if (state.submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=1920&q=80&auto=format')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 glass-panel rounded-2xl p-12 md:p-16 max-w-lg mx-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-white mb-3">Thank You</h2>
          <p className="text-white/60 leading-relaxed mb-6">
            Your enquiry has been received. Our dedicated reservation team will contact you within 2 hours with personalized rates.
          </p>
          <p className="text-gold text-sm font-medium mb-8">
            For immediate assistance: +960 664 1010
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="btn-gold-gradient px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Wizard UI ─────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=1920&q=80&auto=format')` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Close booking wizard"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Wizard Panel */}
      <section className="relative z-10 w-full max-w-5xl mx-4 md:mx-6 max-h-[90vh] overflow-y-auto rounded-2xl">
        <div className="glass-panel rounded-2xl p-6 md:p-12 lg:p-16">
          {/* Step Indicator */}
          <WizardStepIndicator currentStep={state.step} />

          {/* Headline */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white text-center mt-6 mb-8">
            {stepHeadlines[state.step]}
          </h1>

          {/* Progress Bar */}
          <WizardProgressBar step={state.step} />

          {/* Summary Bar */}
          <WizardSummaryBar
            step={state.step}
            checkIn={state.checkIn}
            checkOut={state.checkOut}
            adults={state.adults}
            children={state.children}
            selectedVilla={state.selectedVilla}
            onGoToStep={(s) => dispatch({ type: 'GO_TO_STEP', step: s })}
          />

          {/* Step Content */}
          <div className="mt-8 min-h-[240px]">
            {state.step === 1 && (
              <StepDates
                checkIn={state.checkIn}
                checkOut={state.checkOut}
                onChange={setField}
              />
            )}
            {state.step === 2 && (
              <StepGuests
                adults={state.adults}
                children={state.children}
                onChange={setField}
              />
            )}
            {state.step === 3 && (
              <StepVillaSelection
                selectedVilla={state.selectedVilla}
                onSelect={(id) => setField('selectedVilla', id)}
              />
            )}
            {state.step === 4 && (
              <StepContact
                firstName={state.firstName}
                lastName={state.lastName}
                email={state.email}
                phone={state.phone}
                specialRequests={state.specialRequests}
                marketingConsent={state.marketingConsent}
                onChange={setField}
              />
            )}
          </div>

          {/* Error message */}
          {state.error && (
            <p className="text-red-400 text-sm text-center mt-4">
              {state.error}. Please try again or call +960 664 1010.
            </p>
          )}

          {/* Action Bar */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-white/10">
            {/* Left: Concierge */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] text-white/50 tracking-widest uppercase font-bold">Concierge Online</p>
            </div>

            {/* Right: Actions */}
            <div className="flex gap-3 w-full md:w-auto">
              {state.step > 1 && (
                <button
                  onClick={() => dispatch({ type: 'PREV_STEP' })}
                  className="flex-1 md:flex-none px-8 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest text-[10px] uppercase hover:bg-white/10 transition-colors"
                >
                  Go Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed(state) || state.submitting}
                className="flex-1 md:flex-none bg-white px-10 py-4 rounded-full text-[#00464a] font-bold tracking-widest text-[10px] uppercase shadow-2xl hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
              >
                {state.submitting ? 'Submitting...' : nextLabels[state.step]}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

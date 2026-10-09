// data.js
const S = { lang: 'en', province: null, cat: null, note: '', pending: null };

const provinces = ['Chiang Rai', 'Chiang Mai', 'Phuket', 'Bangkok'];

const cats = [
  { id: 'medical', n: 'Medical emergency', u: 'High', i: '✚', desc: 'Serious injury, illness, or urgent medical help.' },
  { id: 'police', n: 'Police / active crime', u: 'High', i: '!', desc: 'Immediate danger, crime in progress, or urgent police help.' },
  { id: 'tourist', n: 'Tourist Police', u: 'High', i: 'i', desc: 'Tourist-focused assistance and multilingual support.' },
  { id: 'fire', n: 'Fire / rescue', u: 'High', i: '▲', desc: 'Fire, smoke, rescue, or immediate fire-service help.' },
  { id: 'road', n: 'Road accident', u: 'High', i: '↗', desc: 'Traffic accident, injury, or immediate road-safety risk.' },
  { id: 'disaster', n: 'Disaster / severe weather', u: 'High', i: '!', desc: 'Flood, storm, earthquake, or disaster assistance.' },
  { id: 'passport', n: 'Lost passport', u: 'Low', i: 'P', desc: 'Reporting, replacement-document, and facility guidance.' },
  { id: 'theft', n: 'Non-violent theft', u: 'Low', i: 'T', desc: 'Record details and follow the correct reporting steps.' },
  { id: 'lost', n: 'Lost property', u: 'Low', i: '?', desc: 'Organize details and find the right place to report a lost item.' }
];

const data = {
  medical: { h: '1669', s: 'Medical Emergency Call Center', a: [
    'Move to a safe place if possible.',
    'Call 1669 for emergency medical assistance.',
    'Keep your location and a short description of the injury ready.'
  ]},
  police: { h: '191', s: 'Police Emergency', a: [
    'Move away from immediate danger if it is safe.',
    'Call 191 for urgent police assistance.',
    'Share your location only when you choose to.'
  ]},
  tourist: { h: '1155', s: 'Tourist Police', a: [
    'Call 1155 for tourist-focused assistance.',
    'State your province and situation clearly.',
    'Use location sharing only if it helps responders identify where you are.'
  ]},
  fire: { h: '199', s: 'Fire and Rescue', a: [
    'Leave the dangerous area if it is safe.',
    'Call 199 for fire and rescue assistance.',
    'Do not re-enter a dangerous building.'
  ]},
  road: { h: '1669', s: 'Emergency Medical Assistance', a: [
    'Move out of active traffic if it is safe.',
    'Call 1669 if anyone is injured.',
    'Use police assistance if the scene is unsafe.'
  ]},
  disaster: { h: '1784', s: 'Disaster Assistance', a: [
    'Follow local-authority instructions.',
    'Move to a safer location if advised.',
    'Keep identification and essential items ready if evacuation is needed.'
  ]},
  passport: { h: '1155', s: 'Tourist Police Assistance', steps: [
    'Write down when and where you last had the passport.',
    'Report the loss to police or Tourist Police.',
    'Prepare another ID or a passport copy/photo if available.',
    'Contact your embassy or consular office for replacement guidance.'
  ], f: 'Police / Tourist Police office and your embassy or consular office' },
  theft: { h: '1155', s: 'Tourist Police Assistance', steps: [
    'Record what was taken, when, and where.',
    'Preserve receipts, photos, serial numbers, or other useful evidence.',
    'Report the incident to police or Tourist Police.',
    'Contact your bank or service provider if cards or a phone were stolen.'
  ], f: 'Nearest police station or Tourist Police office' },
  lost: { h: '1155', s: 'Tourist Police Assistance', steps: [
    'Write down the item description and the last place you remember having it.',
    'Check the venue, transport operator, hotel, or lost-property office.',
    'Make an official report if the item includes identification or valuables.',
    'Keep any reference number for follow-up.'
  ], f: 'Relevant lost-property office, police station, or Tourist Police office' }
};
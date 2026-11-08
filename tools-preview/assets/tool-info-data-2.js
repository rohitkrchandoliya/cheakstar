/* Cheakstar Tools — per-tool information data (generated, part 2 of 2). Merges into the globals from tool-info-data.js. */
window.CK_TOOL_INFO = Object.assign(window.CK_TOOL_INFO || {}, {
 "url-encoder-decoder": {
  "faq": [
   {
    "a": "No. Your text never leaves this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   },
   {
    "a": "Use Part of a URL for a query value or search text — it is safest. Use Full URL to keep :, /, ? and & as they are in a complete link.",
    "q": "Which mode should I use?"
   },
   {
    "a": "It converts unsafe characters to percent-encoded form — for example, a space becomes %20.",
    "q": "What does encoding do?"
   },
   {
    "a": "Part mode encodes / and ? as well; Full URL mode leaves the link structure (https://, /, ?, &) untouched.",
    "q": "What is the difference between the two modes?"
   }
  ],
  "goodToKnow": [
   "Part of a URL mode encodes everything special, including / and ?, so the result can sit safely inside a link.",
   "Full URL mode leaves the structure of a complete link (https://, /, ?, &) untouched and only encodes the unsafe characters.",
   "URLs cannot contain spaces and many special characters, so they are stored percent-encoded — a space becomes %20.",
   "Your text never leaves this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Select Mode: Encode / decode a part of a URL, or Encode / decode a full URL.",
   "Type text to encode, or paste encoded text to decode, into the Input box.",
   "Click Encode or Decode.",
   "Check the Result and click Copy result to copy it."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "video-compressor": {
  "faq": [
   {
    "a": "No. Compression happens in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "720p (HD, height up to 720) or 480p (SD, height up to 480).",
    "q": "What output sizes can I choose?"
   },
   {
    "a": "Pick Smaller file (CRF 28) for the smallest file, Balanced (CRF 23) for a middle option, or Higher quality (CRF 18) to keep more quality.",
    "q": "Which quality should I pick?"
   },
   {
    "a": "The in-browser engine is single-thread, so compressing is slower than a desktop app.",
    "q": "Why is it slow?"
   }
  ],
  "goodToKnow": [
   "Compression scales the video down to 720p or 480p — it does not keep the original resolution.",
   "Smaller file (CRF 28) gives the smallest result and Higher quality (CRF 18) keeps the most quality, with Balanced (CRF 23) in between.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached); files up to about 50 MB work best, files over 100 MB are refused, and the single-thread engine is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Select Output size: 720p (HD, height up to 720) or 480p (SD, height up to 480).",
   "Select Quality: Smaller file (CRF 28), Balanced (CRF 23) or Higher quality (CRF 18).",
   "Click Compress video and download the smaller file when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "video-converter": {
  "faq": [
   {
    "a": "No. Conversion runs in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "MP4 and WebM, in either direction — MP4 (or other) to WebM, or WebM (or other) to MP4.",
    "q": "Which formats are supported?"
   },
   {
    "a": "It matches the direction you chose: WebM if you converted to WebM, or MP4 if you converted to MP4.",
    "q": "What format is the result?"
   },
   {
    "a": "The browser engine is a single-thread build, so converting is slower than a desktop app.",
    "q": "Why is conversion slow?"
   }
  ],
  "goodToKnow": [
   "Conversion works in either direction between MP4 and WebM.",
   "As the page intro notes, MP4 plays everywhere while WebM is smaller and made for the web.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached); files up to about 50 MB work best, files over 100 MB are refused, and the single-thread engine is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Select the Conversion direction: MP4 (or other) to WebM, or WebM (or other) to MP4.",
   "Click Convert video.",
   "Download the converted video when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "video-merger": {
  "faq": [
   {
    "a": "No. Merging runs in your browser and your videos are never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "The joined clips are saved as one MP4.",
    "q": "What format is the result?"
   },
   {
    "a": "Clips are re-encoded to the first clip's size, so clips recorded on different devices still join cleanly.",
    "q": "What if my clips have different sizes?"
   },
   {
    "a": "Keep the combined size under about 50 MB with short clips. Any single file over 100 MB is refused.",
    "q": "Why did merging fail?"
   }
  ],
  "goodToKnow": [
   "The merged result is a single MP4, with clips played one after another in the order shown.",
   "Clips are re-encoded to one size (the first clip's size), so clips from different devices still join cleanly.",
   "Keep the combined size under about 50 MB and use short clips; any single file over 100 MB is refused.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached) and is single-thread, so merging is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose video files using the Choose video files picker — select two or more small videos.",
   "Arrange the clips in the order shown, so they play one after another in that order.",
   "Click Merge into one MP4.",
   "Download the merged MP4 when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "video-speed-changer": {
  "faq": [
   {
    "a": "No. The speed change runs in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "0.5x — half speed (slow motion), 1.5x — one and a half times faster, and 2x — double speed.",
    "q": "Which speeds are available?"
   },
   {
    "a": "Yes — picture and sound are adjusted together. Pitch changes with speed, as the page intro explains.",
    "q": "Will the audio stay in sync?"
   },
   {
    "a": "The engine is single-thread and slower than a desktop app. Files over 100 MB are refused due to browser memory limits.",
    "q": "Why is it slow or why did a large file fail?"
   }
  ],
  "goodToKnow": [
   "Both picture and sound are adjusted together, so voices stay in sync — pitch changes with speed, like speeding up a recording.",
   "Only three speeds are offered: 0.5x — half speed (slow motion), 1.5x and 2x.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached); files up to about 50 MB work best, files over 100 MB are refused, and the single-thread engine is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Select New speed: 0.5x, 1.5x or 2x.",
   "Click Change speed.",
   "Download the adjusted video when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "voice-recorder": {
  "faq": [
   {
    "a": "No. The recording never leaves this device — it is made and stored only in this browser tab and is never uploaded.",
    "q": "Is my recording uploaded?"
   },
   {
    "a": "The format your browser records best, usually WebM or OGG. Use the Audio Converter tool here if you need MP3.",
    "q": "What format is the recording?"
   },
   {
    "a": "Closing the tab without downloading loses the recording — nothing is kept on any server to recover it from.",
    "q": "What happens if I close the tab?"
   },
   {
    "a": "The recorder needs microphone access via your browser. Check that you allowed microphone permission for this site.",
    "q": "Why is there no sound or why did recording not start?"
   }
  ],
  "goodToKnow": [
   "Recordings are saved in the format your browser records best (usually WebM or OGG) — use the Audio Converter tool on this site if you need MP3.",
   "The recording is made and stored only in this browser tab — closing the tab without downloading loses it, and nothing is kept on any server.",
   "The tool uses your microphone via getUserMedia and MediaRecorder, so it needs microphone permission to work."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your recordings are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Click Start recording and allow microphone access when your browser asks.",
   "Speak for your voice note, song idea or dictation.",
   "Click Stop recording when you are finished.",
   "Download the recording from this tab before you close it."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "word-counter": {
  "faq": [
   {
    "a": "No. Your text is counted only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   },
   {
    "a": "Words, characters, sentences and reading time, updated as you type.",
    "q": "What does it count?"
   },
   {
    "a": "No. Counts appear instantly as you type or paste.",
    "q": "Do I need to click anything to get counts?"
   },
   {
    "a": "Click Clear text to remove the current text.",
    "q": "How do I start over?"
   }
  ],
  "goodToKnow": [
   "Counting happens as you type, with no need to press a submit button.",
   "Counts include words, characters, sentences and reading time — useful for essays, articles, applications and social posts with length limits.",
   "Your text is counted only in this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Type or paste your text into the Your text box — the placeholder says Start typing or paste your text here...",
   "Read the counts as you type: words, characters, sentences and reading time update instantly.",
   "Click Clear text if you want to remove the text and start again."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "age-calculator": {
  "faq": [
   {
    "a": "No. Dates are calculated only in this browser tab and are never sent anywhere, including to Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Yes. Fill in the Age on this date field with that date instead of leaving it blank for today.",
    "q": "Can I work out the age on a specific past or future date?"
   },
   {
    "a": "Total days lived, the day of the week of the birth date, and when the next birthday falls.",
    "q": "What extra details do I get?"
   }
  ],
  "goodToKnow": [
   "Along with the exact age, you also get total days lived, the day of the week you were born, and when the next birthday falls.",
   "The second date field is optional — leaving it blank calculates the age as of today."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your dates are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the Date of birth.",
   "Optionally set Age on this date — leave it blank to use today.",
   "Click Calculate age.",
   "Read the exact age in years, months and days, along with the extra details shown."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "date-difference-calculator": {
  "faq": [
   {
    "a": "No. Dates are calculated only in this browser tab and are never sent anywhere, including to Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It works out the days between a From date and a To date, and it can add or subtract a number of days from a start date.",
    "q": "What can this calculator do?"
   },
   {
    "a": "Use Calculate difference for the gap between two dates, and Calculate new date after entering a start date, a number of days and an operation.",
    "q": "Which button should I use?"
   }
  ],
  "goodToKnow": [
   "The page has two separate tools: days between two dates, and adding or subtracting days from a date.",
   "Each part has its own button — Calculate difference for the gap, and Calculate new date for the add or subtract calculation."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your dates are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "For the gap between two dates: enter the From date and the To date, then click Calculate difference.",
   "For a new date: enter the Start date and the Number of days.",
   "Set the Operation to Add days or Subtract days.",
   "Click Calculate new date to see the resulting date."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "dns-lookup": {
  "faq": [
   {
    "a": "The domain name you enter is sent to Google Public DNS (dns.google), or to Cloudflare DNS if Google does not answer. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "The lookup covers A, AAAA, MX, TXT, NS, CNAME and SOA records for the domain.",
    "q": "Which record types can I see?"
   },
   {
    "a": "The tool can only show records that are actually published in public DNS. If a record has not been set or has not propagated, it will not appear.",
    "q": "Why is a record I expected missing?"
   }
  ],
  "goodToKnow": [
   "Records come from Google Public DNS, with Cloudflare DNS as a fallback if Google does not answer.",
   "This shows the public DNS records anyone can see — private or internal network records are not included.",
   "DNS is useful for checking a website or email setup, for example whether MX records point to a mail service."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to Google Public DNS (dns.google), or Cloudflare DNS as a fallback, to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type a domain into the Domain name field, for example example.com.",
   "Click Look up DNS records.",
   "Read the records returned for that domain, such as A, AAAA, MX, TXT, NS, CNAME and SOA."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "email-breach-check": {
  "faq": [
   {
    "a": "The email address is sent to XposedOrNot (api.xposedornot.com) to run the check — that is how the service works. It is not sent to Cheakstar, and Cheakstar keeps no record of it.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It means the address was not found in the breaches this service knows about. It does not guarantee the address has never been exposed anywhere.",
    "q": "What does a clean result mean?"
   },
   {
    "a": "Change that account's password and turn on two-factor authentication.",
    "q": "What should I do if my email appears in a breach?"
   }
  ],
  "goodToKnow": [
   "Results come from the free XposedOrNot service, so coverage is limited to the breaches that service knows about.",
   "A clean result means the address was not found in those known breaches — it is not a guarantee for all time.",
   "If an address does appear in a breach, change that account's password and turn on two-factor authentication."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to the XposedOrNot service to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type an address into the Email address field.",
   "Click Check email.",
   "Read the result: whether the address appears in the breaches the service knows about."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "emi-calculator": {
  "faq": [
   {
    "a": "No. The calculation runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It follows the standard formula banks use, but your bank's figure can differ slightly due to fees, insurance or the exact start date. Treat the result as a planning estimate, not a loan offer.",
    "q": "How accurate is this?"
   },
   {
    "a": "The monthly instalment (EMI), the total interest over the loan, and the total payment.",
    "q": "What does the result show?"
   }
  ],
  "goodToKnow": [
   "This uses the standard reducing-balance EMI formula with monthly rests, the way most Indian banks calculate.",
   "Your bank's actual EMI can differ slightly because of fees, insurance, or the exact start date.",
   "It works for a home, car, personal or education loan."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the Loan amount (₹).",
   "Enter the Interest rate (% per year).",
   "Enter the Time period (years).",
   "Click Calculate EMI to see the monthly instalment, total interest and total payment."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "gst-calculator": {
  "faq": [
   {
    "a": "No. The calculation runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Adding starts from a price before tax and gives the inclusive total. Removing starts from an inclusive price and works out the base amount and tax inside it.",
    "q": "What is the difference between adding and removing GST?"
   },
   {
    "a": "Within a state the tax is split half CGST and half SGST; between states it is fully IGST. The calculator shows the split both ways.",
    "q": "Why are there two splits, CGST/SGST and IGST?"
   }
  ],
  "goodToKnow": [
   "Within a state, the GST amount is half CGST and half SGST; between states it is fully IGST — this calculator shows the split both ways.",
   "The preset rates are the standard GST slabs; check the current rate for your item before filing.",
   "The Custom GST rate (%) field is used only when you select Custom rate… in the GST rate list."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose what you want to do: Add GST to an amount (exclusive → inclusive) or Remove GST from an amount (inclusive → exclusive).",
   "Enter the Amount (₹).",
   "Pick a GST rate — 0%, 5%, 12%, 18% or 28% — or choose Custom rate… and enter a Custom GST rate (%).",
   "Click Calculate GST to see the tax amount and the CGST/SGST or IGST split."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "ip-lookup": {
  "faq": [
   {
    "a": "The address you enter is sent to the free ipwho.is lookup service to fetch its details. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It is approximate. It reflects where the provider's network is located, not an exact street address.",
    "q": "How accurate is the location?"
   },
   {
    "a": "No. It shows the country, city, ISP and network for an address — not the person behind it.",
    "q": "Can this tell me who is using an IP address?"
   }
  ],
  "goodToKnow": [
   "IP locations are approximate — they point to the provider's network, not to a person's house.",
   "Results therefore identify the network an address belongs to, not the individual using it.",
   "Both IPv4 and IPv6 addresses can be looked up."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to the ipwho.is lookup service to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type an IPv4 or IPv6 address into the IP address field.",
   "Click Look up IP address.",
   "Read the country, city, ISP and network shown for that address."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "password-breach-check": {
  "faq": [
   {
    "a": "The password itself is never sent. Only the first 5 characters of its SHA-1 hash go to Have I Been Pwned, and the match is completed on this device.",
    "q": "Is my password sent anywhere?"
   },
   {
    "a": "It is checked against real breach data through the Have I Been Pwned range service, using a partial hash.",
    "q": "What service is the password checked against?"
   },
   {
    "a": "It means that exact password has appeared in breach data, so it should not be used. It does not by itself prove your account was the one breached.",
    "q": "Does a match mean my account was hacked?"
   },
   {
    "a": "No. It means the password was not found in the breach data checked — a unique password you have not reused is still the safer choice.",
    "q": "Is a password with no match guaranteed safe?"
   }
  ],
  "goodToKnow": [
   "Only the first 5 characters of the password's scrambled fingerprint (SHA-1 hash) are sent to Have I Been Pwned; the match is completed on this device — a method called k-anonymity.",
   "The password box is cleared as soon as the check runs.",
   "As a habit, do not type a password you currently use on an important account into any website — use this to test old or candidate passwords."
  ],
  "privacyKind": "hashonly",
  "privacyNote": "The password itself is never sent — the check works through the Have I Been Pwned range service using a partial hash, and the match is completed on this device. Cheakstar receives nothing.",
  "steps": [
   "Type a password into the Password to check field.",
   "Click Check password.",
   "Read the result showing whether that password appears in known breach data."
  ],
  "privacyTitle": "Your password itself is never sent anywhere"
 },
 "percentage-calculator": {
  "faq": [
   {
    "a": "No. Everything is calculated on this device only — your values are never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Use the second calculator: enter your marks as This number (part) and the total marks as Of this number (whole), then click Calculate.",
    "q": "How do I work out my marks as a percentage?"
   },
   {
    "a": "Enter a From this value and a To this value and click Calculate change to see how much the value changed in percent.",
    "q": "What does percentage change tell me?"
   }
  ],
  "goodToKnow": [
   "There are three separate calculators on the page, each with its own fields and button.",
   "For marks, use the second calculator — your marks as the part and the total marks as the whole."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose the calculation you need: a percentage of a number, a number as a percent of another, or percentage change.",
   "For a percentage of a number: enter the Percentage (%) and the Of this number value, then click Calculate.",
   "For a share of a total: enter This number (part) and Of this number (whole), then click Calculate.",
   "For change: enter From this value and To this value, then click Calculate change."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "phone-number-checker": {
  "faq": [
   {
    "a": "No. The number is checked entirely on this device in your browser, and it is never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "No. Owner names and live carrier details are private operator data. This tool reports only what the number itself proves: its country, line type and formats.",
    "q": "Can this tell me who owns the number?"
   },
   {
    "a": "The country, the kind of line, the number's standard formats, one-tap call and WhatsApp links, and whether the number is even possible.",
    "q": "What do I get from a check?"
   },
   {
    "a": "The same digits can belong to different countries, so the country code is needed to identify the number correctly.",
    "q": "Why does it ask for a country code?"
   }
  ],
  "goodToKnow": [
   "The number must include its country code for the country and line type to be identified correctly.",
   "The check can show the kind of line — mobile, landline, toll-free and more — but not who the number belongs to.",
   "No free tool or database can tell you who owns a number or its live carrier company; that data is private and held by the telecom operators."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the number you enter is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Type a number into the Phone number (with country code) field, for example +91 98765 43210.",
   "Click Check number.",
   "Read the country, line type, standard formats and calling links shown, and whether the number is possible."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "photo-privacy-checker": {
  "faq": [
   {
    "a": "No. Your photo is read only inside your browser, on this device, and is never uploaded to any server, including Cheakstar.",
    "q": "Is my photo sent anywhere?"
   },
   {
    "a": "Its EXIF data can include the camera or phone model, the date and time it was taken, and often the exact GPS location.",
    "q": "What can a photo reveal?"
   },
   {
    "a": "Either the photo has no GPS data saved in it, or that data was already removed before you received the file.",
    "q": "Why did my photo show no location?"
   },
   {
    "a": "No. It only shows you what the photo carries, so you can decide whether to share the original file.",
    "q": "Does this tool remove the data?"
   }
  ],
  "goodToKnow": [
   "EXIF is extra data photos quietly carry: the device model, the date and time, and often the exact GPS location where the photo was taken.",
   "Many photos have little or no EXIF data — for example screenshots or images that were already stripped — so some fields may be empty.",
   "Most messaging apps strip some of this data when you send a photo as a message, but sending the original file as a document or by email usually keeps all of it."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Click Choose a photo and pick an image file from your device.",
   "Wait while the photo's EXIF data is read in your browser.",
   "Review what is shown — such as GPS location, camera or phone model and the date taken — before you share the photo."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "qr-code-generator": {
  "faq": [
   {
    "a": "No. The code is generated entirely in your browser, and nothing you type — including a Wi-Fi password or UPI ID — is uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "You can make a code for a link or text, a Wi-Fi network, a UPI ID, or a contact card (vCard). The fields shown change with the Type you choose.",
    "q": "What types of QR code can I make?"
   },
   {
    "a": "Yes. Scan it with your phone camera first to confirm it opens or connects exactly as you intended, especially before printing.",
    "q": "Should I test the code before I share it?"
   },
   {
    "a": "PNG is a standard image file at the size you selected. SVG is a scalable vector file, which stays sharp when enlarged for print.",
    "q": "What is the difference between PNG and SVG?"
   }
  ],
  "goodToKnow": [
   "For Wi-Fi codes you can set Security to WPA / WPA2, WEP or No password, and sharing the code also shares that network password with anyone who scans it.",
   "A higher Error correction level (up to High (H)) helps a code stay readable when part of it is covered or damaged.",
   "Download sizes are 256, 512 or 1024 pixels — a larger size is the safer choice if the code will be printed big."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the details you enter to build a code are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose what you are making from the Type list: Link or text, Wi-Fi network, UPI ID or Contact card (vCard).",
   "Fill in the fields for that type, such as Link or text, Network name (SSID) and Password, UPI ID, or Full name for a contact card.",
   "Set the Download size (pixels) and Error correction level.",
   "Click Generate QR code to create the code.",
   "Click Download PNG or Download SVG to save the finished code."
  ],
  "privacyTitle": "Your data never leaves your browser"
 },
 "qr-code-scanner": {
  "faq": [
   {
    "a": "No. The image is decoded only in this browser tab and is never uploaded to any server, including Cheakstar.",
    "q": "Is my image sent anywhere?"
   },
   {
    "a": "No. The tool shows you the contents first and does not open a link or start a payment on its own.",
    "q": "Will scanning open the link automatically?"
   },
   {
    "a": "Choose an image file that contains a QR code, such as a photo or screenshot of the code.",
    "q": "What kind of file can I use?"
   },
   {
    "a": "It lets you check where a payment or login QR really leads before you act on it.",
    "q": "Why would I scan a code I was given?"
   }
  ],
  "goodToKnow": [
   "Scanning only shows you the contents — it never opens a link or starts a payment by itself.",
   "This is a useful check before paying or signing in, so you can see where a payment or login QR really leads.",
   "You choose an image file from this device for the tool to read — the page works from that image."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Click Choose an image with a QR code and pick an image file from your device.",
   "Wait while the image is decoded in this browser tab.",
   "Read the contents shown — for example the link or text the code contains — before you decide what to do with it."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "rdap-whois-lookup": {
  "faq": [
   {
    "a": "The domain name you enter is sent to the public RDAP service at rdap.org, which redirects to the registry for that domain ending. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Most registries hide owner details for privacy. This tool cannot reveal information the registry does not publish.",
    "q": "Why is the owner's name or email missing?"
   },
   {
    "a": "It shows the domain's registrar, creation and expiry dates, nameservers and status, where the registry provides them.",
    "q": "What does this lookup show?"
   }
  ],
  "goodToKnow": [
   "The record comes from the registry for that domain ending, reached via rdap.org — RDAP is the modern version of a WHOIS lookup.",
   "Owner names and emails are hidden by most registries for privacy, so those fields are often absent — that is normal.",
   "What you see depends on what the registry publishes, so the amount of detail varies between domain endings."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to rdap.org, which redirects to the registry for that domain ending, to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type a domain into the Domain name field, for example example.com.",
   "Click Look up domain info.",
   "Read the registrar, creation and expiry dates, nameservers and status shown for the domain."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "security-headers-check": {
  "faq": [
   {
    "a": "The website address you enter is sent to Mozilla's MDN Observatory service to run the scan. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Only one scan per minute per website is allowed, so a recent result may be shown from the service's cache.",
    "q": "Why did I get the same result twice in a row?"
   },
   {
    "a": "No. The scan looks at the public homepage only, not every page on the site.",
    "q": "Does it check the whole website?"
   }
  ],
  "goodToKnow": [
   "The scan runs on Mozilla's MDN Observatory service using its current v2 API, and it looks at the public homepage only.",
   "One scan per minute per website is allowed, and a recent result may be shown from the service's cache — that is normal.",
   "Security headers are instructions a site sends your browser to protect you against script injection, clickjacking, insecure connections and more."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to Mozilla's MDN Observatory service to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type a website into the Website address field, for example example.com.",
   "Click Check security headers.",
   "Read the grade and header results returned for that site's homepage."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "sip-calculator": {
  "faq": [
   {
    "a": "No. The calculation runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It is exact maths on the return you assume, but real returns vary year to year, so the actual outcome will differ. It is a planning estimate, not a promise or investment advice.",
    "q": "How accurate is this?"
   },
   {
    "a": "SIP stands for Systematic Investment Plan — here it simply means the fixed monthly amount you enter.",
    "q": "What does SIP mean?"
   }
  ],
  "goodToKnow": [
   "The result is simple maths with a steady assumed return — real market returns move up and down year to year.",
   "Because of that, the actual result will differ from the estimate — sometimes by a lot.",
   "The Expected return is a figure you assume yourself; the calculator does not predict what any fund will return."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the Monthly investment (₹).",
   "Enter the Expected return (% per year).",
   "Enter the Time period (years).",
   "Click Calculate SIP value to see how much you put in versus how much growth the assumed return adds."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "subdomain-finder": {
  "faq": [
   {
    "a": "The domain name you enter is sent to crt.sh, the public Certificate Transparency search service. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "The list is built from certificate records. A subdomain with no certificate in the public logs will not appear.",
    "q": "Why is a subdomain I know about missing?"
   },
   {
    "a": "Busy domains return many records. The tool waits up to 2 minutes and shows at most 300 subdomains.",
    "q": "Why did the search take a long time?"
   },
   {
    "a": "No. Certificate Transparency logs are a public record, and this tool only shows what is already public.",
    "q": "Is this information private?"
   }
  ],
  "goodToKnow": [
   "Results come from public Certificate Transparency logs via crt.sh, so only subdomains that appear in those records are listed.",
   "A subdomain with no certificate will not appear in the results.",
   "At most 300 subdomains are shown, and a busy domain can take a while — this tool waits up to 2 minutes."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to crt.sh, the public Certificate Transparency search service, to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Type a domain into the Domain name field, for example example.com.",
   "Click Find subdomains.",
   "Wait for the list to load, then read the subdomains found for that domain."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "unit-converter": {
  "faq": [
   {
    "a": "No. Everything is calculated on this device only — your values are never uploaded to any server, including Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "Length, Weight, Temperature and Data size. The From and To unit lists change with the Category you pick.",
    "q": "Which categories can I convert?"
   },
   {
    "a": "Data sizes here use the binary scale, the way operating systems count, so 1 KB = 1024 bytes.",
    "q": "Why is 1 KB shown as 1024 bytes?"
   },
   {
    "a": "Click Swap units to swap the From and To units.",
    "q": "How do I reverse a conversion?"
   }
  ],
  "goodToKnow": [
   "Data sizes use the binary scale (1 KB = 1024 bytes), the way operating systems count.",
   "Temperature converts between Celsius, Fahrenheit and Kelvin.",
   "There is no separate convert button for the result — the conversion updates as you type."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your values are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a Category: Length, Weight, Temperature or Data size.",
   "Enter a Value.",
   "Set the From and To units.",
   "Read the converted result — it updates as you type — and use Swap units to reverse the direction."
  ],
  "privacyTitle": "Everything is calculated on your device"
 },
 "video-link-info": {
  "faq": [
   {
    "a": "Your link is sent to YouTube's or Vimeo's public oEmbed service (or noembed) to fetch the video details. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "It works with YouTube and Vimeo video links.",
    "q": "Which sites does this work with?"
   },
   {
    "a": "No. It only shows the title, channel and thumbnail for the link you paste.",
    "q": "Can this download the video?"
   },
   {
    "a": "The thumbnail loads from the video platform's own image servers.",
    "q": "Where does the thumbnail come from?"
   }
  ],
  "goodToKnow": [
   "The details come from the free oEmbed service, with noembed as a fallback if the first lookup does not answer.",
   "This tool only reads public information about the video — it does not download the video.",
   "The details shown are the ones the platform itself publishes for that link, so anything the platform does not expose will not appear."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to YouTube's or Vimeo's public oEmbed service (or noembed) to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Paste a YouTube or Vimeo link into the Video link field.",
   "Click Look up video info.",
   "See the video's title, channel and thumbnail as returned for that link."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "whats-my-ip": {
  "faq": [
   {
    "a": "Your details are fetched from the free ipwho.is service, with ipify as a fallback. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "The location follows your provider's network — and if a VPN is on, it shows the VPN's address and location instead of yours.",
    "q": "Why does the location look wrong?"
   },
   {
    "a": "No. The details load automatically when the page opens; the Refresh my IP details button loads them again.",
    "q": "Do I need to enter anything?"
   }
  ],
  "goodToKnow": [
   "This is the public address websites see when you visit them, not a private address used inside your home network.",
   "If you use a VPN, you will see the VPN's address and location instead of your own.",
   "Location details are based on the provider's network, so treat them as approximate rather than an exact position."
  ],
  "privacyKind": "lookup",
  "privacyNote": "Your query is sent to the ipwho.is service (with ipify as a fallback) to fetch the public data — nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Open the page — your public IP details load automatically.",
   "Read your public IP address, location and internet provider as shown.",
   "Click Refresh my IP details if you want to load the details again, for example after connecting to a VPN."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 },
 "youtube-thumbnail-downloader": {
  "faq": [
   {
    "a": "The thumbnail image loads directly from YouTube's image servers when you enter a link or ID. Nothing is sent to or stored by Cheakstar.",
    "q": "Is my data sent anywhere?"
   },
   {
    "a": "No. This tool only gets the public thumbnail image; no video-download feature is offered here.",
    "q": "Can this download the video itself?"
   },
   {
    "a": "Yes. The field accepts a full YouTube link or a video ID on its own.",
    "q": "Can I paste just the video ID?"
   },
   {
    "a": "No. Thumbnails are public images, so this works for public videos only.",
    "q": "Does it work for private videos?"
   }
  ],
  "goodToKnow": [
   "This tool fetches thumbnail images only — it cannot download videos.",
   "Thumbnails are public image URLs served by YouTube itself, so this works for any public video.",
   "To download a video you uploaded yourself, use YouTube Studio: open Content, open the video's menu and choose Download."
  ],
  "privacyKind": "lookup",
  "privacyNote": "The thumbnail image loads directly from YouTube's image servers when you enter a video link or ID. Nothing is sent to or stored by Cheakstar.",
  "steps": [
   "Paste a video link or type a video ID into the YouTube link or video ID field.",
   "Click Get thumbnails.",
   "Choose the HD or SD version shown and save the thumbnail image."
  ],
  "privacyTitle": "This tool sends your query to a public lookup service"
 }
});
window.CK_TOOL_RELATED = Object.assign(window.CK_TOOL_RELATED || {}, {
 "url-encoder-decoder": [
  {
   "slug": "word-counter",
   "name": "Word & Character Counter",
   "description": "Count words, characters, sentences and reading time as you type."
  },
  {
   "slug": "case-converter",
   "name": "Case Converter & Line Tools",
   "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
  },
  {
   "slug": "csv-json-converter",
   "name": "CSV / JSON Converter",
   "description": "Convert CSV to JSON and JSON back to CSV, with a preview."
  },
  {
   "slug": "base64-encoder-decoder",
   "name": "Base64 Encoder & Decoder",
   "description": "Encode or decode Base64, for text and for files."
  }
 ],
 "video-compressor": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "extract-audio",
   "name": "Extract Audio from Video",
   "description": "Pull the sound out of a video and save it as an MP3."
  },
  {
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  }
 ],
 "video-converter": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "extract-audio",
   "name": "Extract Audio from Video",
   "description": "Pull the sound out of a video and save it as an MP3."
  },
  {
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  }
 ],
 "video-merger": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "extract-audio",
   "name": "Extract Audio from Video",
   "description": "Pull the sound out of a video and save it as an MP3."
  },
  {
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  }
 ],
 "video-speed-changer": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "extract-audio",
   "name": "Extract Audio from Video",
   "description": "Pull the sound out of a video and save it as an MP3."
  },
  {
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  }
 ],
 "voice-recorder": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "extract-audio",
   "name": "Extract Audio from Video",
   "description": "Pull the sound out of a video and save it as an MP3."
  },
  {
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  }
 ],
 "word-counter": [
  {
   "slug": "case-converter",
   "name": "Case Converter & Line Tools",
   "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
  },
  {
   "slug": "csv-json-converter",
   "name": "CSV / JSON Converter",
   "description": "Convert CSV to JSON and JSON back to CSV, with a preview."
  },
  {
   "slug": "base64-encoder-decoder",
   "name": "Base64 Encoder & Decoder",
   "description": "Encode or decode Base64, for text and for files."
  },
  {
   "slug": "json-formatter",
   "name": "JSON Formatter & Validator",
   "description": "Pretty-print JSON and pinpoint the error when it is invalid."
  }
 ],
 "age-calculator": [
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  }
 ],
 "date-difference-calculator": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  }
 ],
 "dns-lookup": [
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  },
  {
   "slug": "subdomain-finder",
   "name": "Subdomain Finder",
   "description": "List a domain's subdomains from public Certificate Transparency logs."
  }
 ],
 "email-breach-check": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "emi-calculator": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  }
 ],
 "gst-calculator": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  }
 ],
 "ip-lookup": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  },
  {
   "slug": "subdomain-finder",
   "name": "Subdomain Finder",
   "description": "List a domain's subdomains from public Certificate Transparency logs."
  }
 ],
 "password-breach-check": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "percentage-calculator": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  }
 ],
 "phone-number-checker": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "photo-privacy-checker": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "qr-code-generator": [
  {
   "slug": "qr-code-scanner",
   "name": "QR Code Scanner",
   "description": "Read a QR code from an uploaded image and see what it contains."
  },
  {
   "slug": "youtube-thumbnail-downloader",
   "name": "YouTube Thumbnail Downloader",
   "description": "Get the public thumbnail of any YouTube video in HD or SD."
  },
  {
   "slug": "video-link-info",
   "name": "Video Link Info",
   "description": "See a YouTube or Vimeo video's title, channel and thumbnail from its link."
  }
 ],
 "qr-code-scanner": [
  {
   "slug": "qr-code-generator",
   "name": "QR Code Generator",
   "description": "Create QR codes for links, text, Wi-Fi, UPI and contact cards."
  },
  {
   "slug": "youtube-thumbnail-downloader",
   "name": "YouTube Thumbnail Downloader",
   "description": "Get the public thumbnail of any YouTube video in HD or SD."
  },
  {
   "slug": "video-link-info",
   "name": "Video Link Info",
   "description": "See a YouTube or Vimeo video's title, channel and thumbnail from its link."
  }
 ],
 "rdap-whois-lookup": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  },
  {
   "slug": "subdomain-finder",
   "name": "Subdomain Finder",
   "description": "List a domain's subdomains from public Certificate Transparency logs."
  }
 ],
 "security-headers-check": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "sip-calculator": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  }
 ],
 "subdomain-finder": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "whats-my-ip",
   "name": "What's My IP",
   "description": "See your own public IP address, location and internet provider."
  }
 ],
 "unit-converter": [
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  }
 ],
 "video-link-info": [
  {
   "slug": "qr-code-generator",
   "name": "QR Code Generator",
   "description": "Create QR codes for links, text, Wi-Fi, UPI and contact cards."
  },
  {
   "slug": "qr-code-scanner",
   "name": "QR Code Scanner",
   "description": "Read a QR code from an uploaded image and see what it contains."
  },
  {
   "slug": "youtube-thumbnail-downloader",
   "name": "YouTube Thumbnail Downloader",
   "description": "Get the public thumbnail of any YouTube video in HD or SD."
  }
 ],
 "whats-my-ip": [
  {
   "slug": "dns-lookup",
   "name": "DNS Lookup",
   "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
  },
  {
   "slug": "rdap-whois-lookup",
   "name": "Domain Info (WHOIS / RDAP)",
   "description": "See a domain's registrar, creation and expiry dates, nameservers and status."
  },
  {
   "slug": "ip-lookup",
   "name": "IP Address Lookup",
   "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
  },
  {
   "slug": "subdomain-finder",
   "name": "Subdomain Finder",
   "description": "List a domain's subdomains from public Certificate Transparency logs."
  }
 ],
 "youtube-thumbnail-downloader": [
  {
   "slug": "qr-code-generator",
   "name": "QR Code Generator",
   "description": "Create QR codes for links, text, Wi-Fi, UPI and contact cards."
  },
  {
   "slug": "qr-code-scanner",
   "name": "QR Code Scanner",
   "description": "Read a QR code from an uploaded image and see what it contains."
  },
  {
   "slug": "video-link-info",
   "name": "Video Link Info",
   "description": "See a YouTube or Vimeo video's title, channel and thumbnail from its link."
  }
 ]
});

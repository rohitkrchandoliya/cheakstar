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
 },
 "bmi-calculator": {
  "faq": [
   {
    "a": "For most adults the WHO healthy range is 18.5 to 24.9. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is obese.",
    "q": "What is a healthy BMI?"
   },
   {
    "a": "Not always. Muscle is denser than fat, so a muscular person can show a high BMI without excess body fat. BMI is a population screening tool, not a personal body-fat measurement.",
    "q": "Is BMI accurate for people who lift weights?"
   },
   {
    "a": "Children and teenagers are assessed with BMI-for-age percentiles, not the adult bands used here. Use a paediatric chart or ask a doctor for anyone under 18.",
    "q": "Does this work for children?"
   },
   {
    "a": "No. The calculation runs entirely in your browser and the values you enter never leave your device.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "BMI is a screening guide, not a diagnosis; it can mislead for athletes, older adults and during pregnancy.",
   "The healthy weight range shown uses the WHO band of BMI 18.5 to 24.9 for your height."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your height and weight are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose metric (kg and cm) or imperial (lb, feet and inches) units.",
   "Enter your weight and your height.",
   "Click Calculate BMI to see your score and WHO category.",
   "Check the healthy weight range shown for your height."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "compound-interest-calculator": {
  "faq": [
   {
    "a": "It is how often the interest is added to your balance. Quarterly is the Indian bank standard for fixed deposits; monthly and daily compounding grow slightly faster at the same yearly rate.",
    "q": "What is compounding frequency?"
   },
   {
    "a": "Simple interest is paid only on the original amount. Compound interest is also paid on interest already earned, so growth speeds up over time.",
    "q": "How is this different from simple interest?"
   },
   {
    "a": "The table shows the position at each completed year end. If you enter part years (for example 2.5), the final value still uses the full period; only the table rounds down to whole years.",
    "q": "Why does the year-by-year table stop at whole years?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The monthly deposit is added at the start of each month and compounded monthly, the same convention as this site's SIP Calculator.",
   "One steady rate is assumed for the whole period; real rates change, and tax or fees can reduce the actual result."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter a starting amount.",
   "Enter the yearly interest rate and the number of years.",
   "Choose how often interest compounds, and optionally add a monthly deposit.",
   "Click Calculate growth to see the final value and a year-by-year table."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "fd-calculator": {
  "faq": [
   {
    "a": "Enter the rate your bank quotes for your exact tenure — FD rates differ by tenure, and the rate for 5 years is often different from the rate for 1 year.",
    "q": "What rate should I enter?"
   },
   {
    "a": "No. The maturity value is before tax. TDS depends on your total interest and your PAN and bank details, so it cannot be worked out from the deposit alone.",
    "q": "Does the calculator include TDS?"
   },
   {
    "a": "Banks usually pay a lower rate for the period actually completed and may charge a penalty, so an early exit gives less than this estimate.",
    "q": "What if I break the FD early?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "Indian banks compound FD interest quarterly; that is the method used here.",
   "The senior citizen extra is applied as +0.50%, which most banks offer — check your own bank's rate card, as a few differ.",
   "FD interest is taxable and banks deduct TDS above the yearly interest limit; the figure shown is before tax."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the amount you plan to deposit.",
   "Enter the bank's yearly interest rate and the tenure.",
   "Tick the senior citizen box if the depositor is 60 or above.",
   "Click Calculate maturity value to see the maturity amount and interest earned."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "rd-calculator": {
  "faq": [
   {
    "a": "Interest is compounded quarterly. Each monthly deposit earns interest from when it is paid, so early deposits earn more than later ones. The formula used here is the standard one banks publish.",
    "q": "How is RD interest calculated?"
   },
   {
    "a": "They suit different habits. An FD invests a lump sum at once; an RD builds the amount month by month from income. Rates are often similar for the same tenure.",
    "q": "Is an RD better than an FD?"
   },
   {
    "a": "Yes. RD interest is taxed at your income slab rate, and TDS can apply above the yearly limit. The maturity figure here is before tax.",
    "q": "Is RD interest taxable?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The standard bank RD formula with quarterly compounding is used, assuming every instalment is paid on time.",
   "Late or missed instalments usually attract a small penalty, which this estimate does not deduct."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the amount you will deposit every month.",
   "Enter the yearly interest rate offered by the bank or post office.",
   "Enter the tenure in years and any extra months.",
   "Click Calculate maturity value to see what you will receive."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "ppf-calculator": {
  "faq": [
   {
    "a": "₹1,50,000 per financial year across all your PPF deposits. The minimum is ₹500 a year to keep the account active.",
    "q": "What is the maximum I can deposit in PPF?"
   },
   {
    "a": "PPF interest for a month is calculated on the lowest balance between the 5th and the end of that month. Depositing on or before the 5th makes that month's deposit earn interest for the full month.",
    "q": "Why does deposit timing matter?"
   },
   {
    "a": "PPF currently enjoys EEE status: deposits qualify for the 80C deduction (old regime), and the interest and maturity amount are tax-free. Tax rules can change with future budgets.",
    "q": "Is PPF interest taxable?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The projection follows the real PPF rule: interest is worked out on each month's balance and credited once a year, assuming deposits arrive by the 5th of the month.",
   "The government can revise the PPF rate every quarter, so a 15-year projection at today's rate is an estimate, not a guarantee.",
   "A PPF account matures at 15 years and can be extended in 5-year blocks; projections beyond 15 years assume such an extension."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter how much you deposit in a year (the PPF limit is ₹1,50,000).",
   "Set the interest rate — 7.1% is the long-running recent rate, and you can change it.",
   "Choose yearly or monthly deposits and the number of years.",
   "Click Project PPF balance for the year-by-year growth table."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "discount-calculator": {
  "faq": [
   {
    "a": "Because the 20% is taken from the price after the first discount. On ₹2,000: 50% off leaves ₹1,000, then 20% off leaves ₹800 — a saving of ₹1,200, which is 60%.",
    "q": "Why is 50% + 20% off not 70% off?"
   },
   {
    "a": "Yes. Leave the second discount at 0 (or empty) and only the first discount is applied.",
    "q": "Can I calculate a single discount?"
   },
   {
    "a": "Indian prices are usually quoted with GST included. The breakup works backwards from the final price to show how much of it is the pre-tax value and how much is GST.",
    "q": "What does the GST breakup show?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "A second discount applies to the already-reduced price: 50% + 20% off is a 60% total saving, not 70%.",
   "The GST breakup assumes the final price includes GST at the rate you select."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the prices you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter the original (marked) price.",
   "Enter the first discount percentage, and a second one if the offer stacks two discounts.",
   "Optionally choose a GST rate to split the final price into pre-tax value and tax.",
   "Click Calculate final price to see what you pay and what you save."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "income-tax-calculator": {
  "faq": [
   {
    "a": "After the ₹75,000 standard deduction, taxable income is ₹12,00,000. The slab tax on that is ₹60,000, and the Section 87A rebate for FY 2025-26 covers up to ₹60,000 at that level, bringing the tax to zero.",
    "q": "Why is my new-regime tax zero at ₹12,75,000 salary?"
   },
   {
    "a": "Just above ₹12,00,000 of taxable income, the tax would jump steeply. Marginal relief caps the tax at the amount by which your income exceeds ₹12,00,000, so earning slightly more never leaves you worse off. It also applies at the surcharge thresholds.",
    "q": "What is marginal relief?"
   },
   {
    "a": "Add up deductions such as 80C (up to ₹1,50,000), 80D health premiums, HRA exemption and home-loan interest, and enter the total. The standard deduction is added by the calculator itself.",
    "q": "Which deductions can I enter for the old regime?"
   },
   {
    "a": "No. This estimates your total tax for the year. TDS and advance tax you have already paid would be adjusted against it when you file.",
    "q": "Does this include TDS already deducted?"
   },
   {
    "a": "No. Everything is calculated in your browser; your income figure never leaves your device.",
    "q": "Is my income data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "Figures are for FY 2025-26: new-regime standard deduction ₹75,000, old-regime ₹50,000, plus the Section 87A rebate, marginal relief, surcharge and 4% cess.",
   "Only salary income is covered. Business income, capital gains and other special-rate income are not included.",
   "This is an estimate to help planning — it is not tax advice and does not replace filing on the Income Tax portal."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the income you enter is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter your gross annual salary income.",
   "Select your age group (it changes the old-regime basic exemption).",
   "Enter any old-regime deductions (80C, 80D and similar) apart from the standard deduction.",
   "Click Compare both regimes to see slab-by-slab tax under each and which is lower."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "bmr-calculator": {
  "faq": [
   {
    "a": "BMR is the energy your body burns at complete rest — breathing, circulation, body temperature. TDEE adds your daily movement and exercise on top, and is the number that matters for eating targets.",
    "q": "What is the difference between BMR and TDEE?"
   },
   {
    "a": "Be honest — most people overestimate. A desk job with three gym sessions a week is usually 'Light' or 'Moderate', not 'Active'.",
    "q": "Which activity level should I pick?"
   },
   {
    "a": "That is not recommended without medical supervision. A moderate deficit below TDEE (not below BMR) is the safer, standard approach.",
    "q": "Can I eat below my BMR to lose weight faster?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The Mifflin-St Jeor formula is used — the standard starting point in dietetics. Individual results can still vary by 10% or more.",
   "Lose and gain targets use the common 500 kcal per day rule of thumb, roughly 0.5 kg a week."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your age, weight and height are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Select your sex and enter your age.",
   "Enter your weight in kilograms and height in centimetres.",
   "Choose the activity level that honestly matches your week.",
   "Click Calculate calories to see your BMR, TDEE and goal targets."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "cgpa-calculator": {
  "faq": [
   {
    "a": "Percentage = CGPA x 9.5. So a CGPA of 9.0 converts to 85.5%.",
    "q": "What is the CBSE formula for CGPA to percentage?"
   },
   {
    "a": "If your formula is a simple multiplier, choose 'Custom multiplier' and enter it. If it includes an adjustment (for example x 10 minus 7.5), this converter cannot apply it — use your university's published method.",
    "q": "My university uses a different formula. Can I use it here?"
   },
   {
    "a": "No. With the x 9.5 formula, 10 CGPA equals 95%. CGPA and percentage are different scales, so a direct 10-times reading overstates the percentage.",
    "q": "Is 10 CGPA equal to 100 percent?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "There is no single national formula. CBSE uses x 9.5; some universities use x 10 or a formula of their own.",
   "For official forms, the conversion printed on your marksheet or in your university's rules is the one that counts."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the marks you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose the direction: CGPA to percentage, or percentage to CGPA.",
   "Choose the multiplier your board or university uses (9.5 is the CBSE standard).",
   "Enter your CGPA or percentage.",
   "Click Convert to see the result and the formula used."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "pregnancy-due-date-calculator": {
  "faq": [
   {
    "a": "By Naegele's rule: 280 days (40 weeks) are added to the first day of your last period. It is the same starting estimate most doctors use before a scan.",
    "q": "How is the due date calculated?"
   },
   {
    "a": "A longer cycle usually means ovulation happened later, so the real due date may be a few days after the estimate. An early ultrasound gives a more accurate date.",
    "q": "My cycle is longer than 28 days. Is the date still right?"
   },
   {
    "a": "This calculator needs that date. Your doctor can estimate the due date from an ultrasound scan instead.",
    "q": "What if I do not remember my last period date?"
   },
   {
    "a": "No. The calculation runs in your browser and the date is never stored or sent anywhere.",
    "q": "Is the date I enter stored or shared?"
   }
  ],
  "goodToKnow": [
   "Naegele's rule (last period + 280 days) assumes a regular 28-day cycle; irregular cycles shift the estimate.",
   "Only about 1 in 20 babies arrive on the exact due date — two weeks either side is common."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the date you enter is processed on this device and is never uploaded, stored or shared.",
  "steps": [
   "Enter the first day of your last menstrual period.",
   "Click Calculate due date.",
   "See your estimated due date, how far along you are today, and your trimester.",
   "Confirm the date with your doctor or first ultrasound."
  ],
  "privacyTitle": "Your date stays on your device"
 },
 "water-intake-calculator": {
  "faq": [
   {
    "a": "It is a rough average that happens to suit a mid-size adult in mild weather. Your real need scales with your weight, activity and climate, which is what this calculator adjusts for.",
    "q": "Is the '8 glasses a day' rule correct?"
   },
   {
    "a": "Yes, in extreme amounts over a short time. Spread your intake through the day and drink to thirst around the target rather than forcing large volumes at once.",
    "q": "Can I drink too much water?"
   },
   {
    "a": "No — fluid intake for such conditions is a medical decision. Follow your doctor's advice instead of a general calculator.",
    "q": "I have a kidney or heart condition. Should I use this target?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The estimate uses about 35 ml per kilogram of body weight, a widely used general guide, plus fixed extras for activity and heat.",
   "Food, tea, coffee and other drinks also contribute water, so the target is for total daily water, most of it usually from drinks."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the details you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Enter your body weight in kilograms.",
   "Choose your daily activity level.",
   "Choose the climate — hot weather adds extra water.",
   "Click Calculate water intake for your daily target in litres and glasses."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "scientific-calculator": {
  "faq": [
   {
    "a": "Tap 2, then the x^y key, then 10, then =. The x² key is a shortcut for squaring the number before it.",
    "q": "How do I calculate a power, like 2 to the power of 10?"
   },
   {
    "a": "Check the angle mode on the keypad. In RAD mode the calculator expects radians; switch to DEG for degree-based trigonometry.",
    "q": "Why did sin(30) not give 0.5?"
   },
   {
    "a": "Only while the page stays open. After pressing =, typing a number starts a fresh expression and typing an operator continues from the result. The memory keys (M+, MR) hold one value until you clear it with MC or reload the page.",
    "q": "Does the calculator remember my last calculation?"
   },
   {
    "a": "No. Everything is calculated in your browser.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "The expression is evaluated by a built-in parser written for this page — it never uses the browser's eval(), and nothing is sent to a server.",
   "The % key converts the number before it into a percentage (50% = 0.5). Factorial works for whole numbers up to 170."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — expressions are evaluated on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Tap the number and function keys, or type with your keyboard.",
   "Use the DEG key to switch trigonometry between degrees and radians.",
   "Press = to evaluate the whole expression at once.",
   "Use MC, MR, M+ and M- to store and reuse a value in memory."
  ],
  "privacyTitle": "Calculated on your device only"
 },
 "stopwatch": {
  "faq": [
   {
    "a": "It reads the device's high-resolution timer and displays hundredths of a second. Your tap reaction time matters far more than the clock's accuracy.",
    "q": "How accurate is the stopwatch?"
   },
   {
    "a": "Once you have recorded two or more laps, the table marks your quickest lap 'Fastest' and your slowest lap 'Slowest' so you can see your consistency at a glance.",
    "q": "What do Fastest and Slowest mean?"
   },
   {
    "a": "Yes. The elapsed time is computed from clock readings, not from counting screen updates, so switching tabs does not lose time. The display simply refreshes again when you return.",
    "q": "Does it keep running if I switch tabs?"
   },
   {
    "a": "No. Timing happens entirely in your browser and laps are kept only in this page.",
    "q": "Is my data sent anywhere?"
   }
  ],
  "goodToKnow": [
   "Timing uses your device's high-resolution clock, so it stays accurate even if the display updates less often while the tab is in the background.",
   "Reloading or closing the page clears the time and all laps — copy the results first if you need them."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — timing happens on this device and nothing is uploaded to any server, including Cheakstar.",
  "steps": [
   "Press Start to begin timing.",
   "Press Lap at each split to record it in the table.",
   "Press Pause to hold the time, and Resume to continue.",
   "Use Copy results to take the lap table with you, then Reset to clear."
  ],
  "privacyTitle": "Timing stays on your device"
 },
 "online-timer": {
   "faq": [
    {
    "a": "Yes. The end time is fixed when you press Start and the remaining time is worked out from the clock, so a background tab still finishes at the right moment. The alarm plays when the page is active again, and right away wherever the browser allows background sound.",
     "q": "Does the timer keep running if I switch tabs?"
    },
    {
      "a": "Check the device volume and that the tab is not muted. Some phones pause sounds from background tabs until the screen is on — keeping the screen awake while the timer runs avoids this.",
     "q": "Why did I not hear the alarm?"
    },
    {
      "a": "99 hours, 59 minutes and 59 seconds.",
     "q": "What is the longest timer I can set?"
    }
     ],
  "goodToKnow": [
    "The remaining time is calculated from the clock, not by counting screen updates, so switching tabs does not make the timer drift.",
   "The alarm is a sound played by this page — keep the tab open and the device sound on. On some phones the screen needs to stay awake for the sound to play at the exact finish.",
   "Where supported, the page asks the screen to stay awake while the timer runs (Wake Lock)."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the countdown happens on this device and nothing is uploaded to any server, including Cheakstar.",
  "steps": [
    "Set the hours, minutes and seconds, or press a preset such as 10 min.",
   "Press Start to begin the countdown.",
   "Press Pause to hold the remaining time, and Resume to continue.",
   "When the countdown reaches zero, the alarm sounds and the page shows Time is up."
  ],
  "privacyTitle": "Timing stays on your device"
 },
 "pomodoro-timer": {
   "faq": [
    {
      "a": "A study and work method built on short, timed focus sessions — classically 25 minutes — separated by short breaks. The rhythm keeps attention fresh and makes a big task feel smaller.",
     "q": "What is the Pomodoro technique?"
    },
    {
      "a": "Yes. Set any focus length from 1 to 180 minutes and any break length from 1 to 60 minutes before you start.",
     "q": "Can I change the 25 and 5 minutes?"
    },
    {
      "a": "Yes. Phase end times are calculated from the clock, so the next phase begins at the right moment even if the tab was in the background.",
     "q": "Does it keep time in a background tab?"
    }
   ],
  "goodToKnow": [
    "Phase changes happen automatically: focus, then break, then focus again, until you pause or reset.",
   "Notifications are optional. They are requested only when you press Enable notifications, never automatically.",
   "Closing or reloading the page clears the session count."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your sessions are counted only in this page and nothing is uploaded to any server, including Cheakstar.",
  "steps": [
    "Set the focus length (25 minutes is the classic choice) and the break length (5 minutes).",
   "Press Start focus and work until the alarm sounds.",
   "Take the break while the break timer runs — the next focus session starts on its own.",
   "The counter under the clock shows how many focus sessions you have completed."
  ],
  "privacyTitle": "Sessions stay on your device"
 },
  world-clock": {
 "faq": [
 {
   "a": "Cities in the same time zone share a clock — for example New Delhi and Mumbai both follow Indian Standard Time.",
  "q": "Why do two cities show the same time?"
 },
 {
   "a": "The city is 5 hours 30 minutes ahead of Coordinated Universal Time (UTC), the world's reference clock. India stays at UTC+5:30 all year.",
  "q": "What does UTC+5:30 mean?"
 },
 {
   "a": "Yes. Times are calculated from the official IANA time zone rules, which include each place's daylight saving dates.",
  "q": "Does the clock handle daylight saving?"
 }
],
 "goodToKnow": [
  "Offsets are each city's current difference from UTC and already include daylight saving where it applies.",
 "The gap between two cities changes during the year when one of them moves its clocks and the other does not.",
 "All clocks read from your device clock — if that is wrong, every time here is off by the same amount."
],
 "privacyKind": "local",
 "privacyNote": "Runs entirely in your browser — the clocks are calculated on this device and nothing is uploaded to any server, including Cheakstar.",
 "steps": [
  "Open the page — every clock is already running.",
 "Find your own time in the first card, labelled Your time.",
 "Compare the city you need: the card shows the local time, the day and date, and the current UTC offset."
],
 "privacyTitle": "Times are worked out on your device"
},
"time-zone-converter": {
 "faq": [
  {
    "a": "India is UTC+5:30 — half an hour ahead of the whole-hour pattern — so differences with most countries include a 30-minute part.",
   "q": "Why is the difference 10 hours 30 minutes, not a round number?"
  },
  {
    "a": "Pick a listed city in the same time zone as yours — for example, Paris and Berlin share Central European Time.",
   "q": "What if my city is not listed?"
  },
  {
    "a": "Yes, for the date given. It follows the official time zone rules, including the daylight saving in force on that date.",
   "q": "Is the conversion exact?"
  }
 ],
  "goodToKnow": [
  "Daylight saving is applied for the exact date you pick, so the same clock time can convert differently in January and in July.",
  "Use Swap cities to reverse the conversion in one press.",
  "The city list holds 20 major cities. New Delhi and Mumbai are both listed even though they share Indian Standard Time, because people look for both."
  ],
 "privacyKind": "local,
  "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
  "Enter the date and time you want to convert.",
  "Choose the city that time belongs to under From.",
  "Choose the destination city under To.",
  "Press Convert — the same moment in the second city appears, with the time difference."
 ],
  "privacyTitle": "Calculated on your device only"
},
"countdown-timer": {
 "faq": [
 {
   "a": "Set the event, then press Copy shareable link. Anyone opening the link sees the same countdown to the same date.",
  "q": "How do I share my countdown?"
 },
  {
    "a": "Set this year's date; when it passes, change the date to next year's and the countdown starts again.",
   "q": "Can I reuse it for a birthday every year?"
  },
 {
   "a": "The page itself stops, but nothing is lost — the date lives in the link, so reopening it shows the correct time remaining.",
  "q": "Does the countdown keep running if I close the page?"
 }
],
 "goodToKnow": [
  "The event name and date are stored inside the link (the part after the #). That part of a link is never sent to the website, so shared countdowns need no account and nothing is stored on a server.",
 "If the date passes, the page says the day has been reached instead of showing negative numbers."
],
 "privacyKind": "local",
 "privacyNote": "Runs entirely in your browser — the event name and date are kept in the page link on this device and are never uploaded to any server, including Cheakstar.",
 "steps": [
  "Type the event name, for example New Year 2027.",
 "Pick the event date and time.",
 "The countdown starts at once — days, hours, minutes and seconds to go.",
 "Press Copy shareable link to send this exact countdown to someone else."
],
 "privacyTitle": "Your event stays in the link, not on a server"
},
"random-number-generator": {
 "faq": [
 {
   "a": "They are drawn from the same cryptographic source your browser uses for security, which is designed to be unpredictable. No pattern from earlier draws affects the next one.",
  "q": "Are these numbers really random?"
 },
  {
    "a": "Simple generators in code follow a predictable sequence once their starting point is known. The cryptographic generator used here does not, and rejection sampling also removes a small bias that quick shortcut methods introduce.",
   "q": "Why not just use a simple random function?"
  },
  {
    "a": "Yes — for a 1-to-49 style draw, set the range 1 to 49, the count to 6, and turn on No repeats.",
   "q": "Can I pick lottery-style numbers?"
  }
 ],
  "goodToKnow": [
  "Numbers come from the cryptographic random generator built into your browser, with rejection sampling — a method that keeps every value in the range equally likely.",
  "With No repeats on, the count cannot be larger than the range itself."
 ],
 "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the numbers are generated on this device and nothing is uploaded to any server, including Cheakstar.",
  "steps": [
  "Set the smallest and largest numbers allowed.",
  "Say how many numbers you want (1 to 10,000).",
  "Turn on No repeats if every number must be different.",
  "Press Generate, then Copy numbers to take the result with you."
 ],
 "privacyTitle": "Generated on your device only"
},
 "coin-flip": {
   "faq": [
  {
    "a": "Yes. The result is decided by the cryptographic random generator in your browser before the coin animation starts, and each side has exactly the same chance.",
   "q": "Is the flip fair?"
  },
    {
      "a": "How many times in a row the same side has come up most recently — for example, Heads × 4 means the last four flips were all heads.",
     "q": "What does the streak mean?"
    },
    {
      "a": "No. The history is only a record for fun; the generator has no memory, so past flips give no clue about the next one.",
     "q": "Can the next flip be predicted from the history?"
    }
   ],
    "goodToKnow": [
   "Each flip is an independent 50-50 event — a streak of heads does not change the chance of the next flip.",
    "The tally and history are kept only in this page and clear on reload."
   ],
   "privacyKind": "local",
    "privacyNote": "Runs entirely in your browser — flips and tallies stay in this page and nothing is uploaded to any server, including Cheakstar.",
    "steps": [
   "Call heads or tails.",
    "Press Flip the coin and watch it spin.",
    "The tally, current streak and recent history update after every flip.",
    "Press Reset tally to start the score again."
   ],
   "privacyTitle": "Flips happen on your device"
 },
 "dice-roller": {
   "faq": [
  {
    "a": "It is the common shorthand for rolling two six-sided dice and adding them — this page writes each roll in that form in the history.",
   "q": "What does 2d6 mean?"
  },
    {
      "a": "Yes. Each face has the same probability on every roll, and rolls do not influence each other.",
     "q": "Are the dice fair?"
    },
    {
      "a": "More combinations make 7 (1+6, 2+5, 3+4 and their reverses) than make 12 (only 6+6). The dice are fair; the totals are not equally likely.",
     "q": "Why does a total of 7 come up more often than 12 with two dice?"
    }
   ],
    "goodToKnow": [
   "Rolls use the cryptographic random generator with rejection sampling, so every face is equally likely.",
    "For a d6 the faces are drawn as pips; other dice show their number in the box."
   ],
   "privacyKind": "local",
    "privacyNote": "Runs entirely in your browser — rolls and history stay in this page and nothing is uploaded to any server, including Cheakstar.",
    "steps": [
   "Choose the type of die — d6 is the ordinary cube; d20 is the twenty-sided role-playing die.",
    "Choose how many dice to roll, from 1 to 6.",
    "Press Roll the dice to see each die and the total.",
    "Your last 10 rolls are listed under Recent rolls."
   ],
   "privacyTitle": "Rolls happen on your device"
},
  "tip-calculator": {
   "faq": [
    {
     "a": "It varies widely by country and by the kind of place. In many Indian restaurants, 5 to 10 percent is a common thank-you where no service charge is added; in the United States, 15 to 20 percent is customary.",
     "q": "How much tip is normal?"
    },
    {
      "a": "Custom differs by place. This calculator applies the percentage to the bill amount you enter, so enter the pre-tax amount if that is the custom you follow.",
      "q": "Should the tip be on the amount before or after tax?"
    },
    {
      "a": "Yes — the breakdown shows the tip per person, so you can just as easily add the full tip to one person's share.",
      "q": "Can one person pay the whole tip?"
    }
   ],
   "goodToKnow": [
    "If the restaurant has already added a service charge to the bill, an extra tip is optional — check the bill first.",
     "Amounts are rounded to two decimal places for display; after rounding, a shared bill can differ by a paisa or two per person.",
   ],
   "privacyKind": "local",
   "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
   "steps": [
    "Choose your currency (rupees by default).",
    "Enter the bill amount and the tip percentage — or press a quick tip button.",
    "Enter how many people are sharing.",
    "Read the total per person, with the bill and tip shares shown separately."
   ],
   "privacyTitle": "Calculated on your device only"
  },
  "loan-amortization-calculator": {
   "faq": [
    {
     "a": "It is the process of clearing a loan through fixed regular payments. An amortization schedule is the full table showing, for every payment, how much is interest, how much is principal, and what balance remains.",
     "q": "What is amortization?"
    },
    {
      "a": "Interest is charged on the outstanding balance every month. Stretching the same loan over more years means more months of interest, even though each EMI is smaller.",
      "q": "Why is the total interest so high on long loans?"
    },
    {
      "a": "Yes — extra payments cut the principal early, which reduces the interest of every later month. This schedule shows the standard plan without extra payments.",
      "q": "Does paying extra shorten the schedule?"
    }
    ],
   "goodToKnow": [
    "In the early months, most of each payment is interest; the principal share grows over time. That is why the balance falls slowly at first.",
    "The last payment is adjusted by a few paise so the balance ends at exactly zero — the same way bank schedules handle rounding.",
    "For a quick EMI without the full table, the EMI Calculator gives the monthly figure on its own."
   ],
   "privacyKind": "local",
   "privacyNote": "Runs entirely in your browser — the amounts you enter are processed on this device and are never uploaded to any server, including Cheakstar.",
   "steps": [
    "Enter the loan amount, the yearly interest rate and the time period.",
    "Press Show schedule to build the month-by-month table.",
    "Read the EMI, total interest and total payment at the top.",
    "Move through the table 12 months at a time with the Previous and Next buttons."
   ],
   "privacyTitle": "Calculated on your device only"
  },
  "text-repeater": {
   "faq": [
    {
      "a": "Very large results make the browser slow to copy and paste. 2,00,000 characters is far more than messaging, pattern and testing uses need.",
      "q": "Why is there a character limit?"
    },
    {
      "a": "Yes — anything you can type into the box can be repeated, including emoji and multi-line text.",
      "q": "Can I repeat an emoji or a full sentence?"
    }
   ],
   "goodToKnow": [
    "One result is limited to 2,00,000 characters so the page stays fast; the tool warns you before building anything over the limit.",
    "A custom separator can be up to 20 characters — handy for patterns like a comma or a pipe symbol."
   ],
   "privacyKind": "local",
   "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
   "steps": [
    "Type or paste the text you want to repeat.",
    "Set how many copies you want, from 1 to 10,000.",
    "Choose what goes between copies — a new line, a space, nothing, or your own separator.",
    "Press Repeat the text, then Copy result."
   ],
   "privacyTitle": "Your text stays on your device"
  },
  "remove-duplicate-lines": {
   "faq": [
    {
      "a": "With the spaces option on (the default), leading and trailing spaces are trimmed before comparing, so those lines count as duplicates of each other.",
      "q": "What happens to lines that differ only in spaces?"
    },
    {
      "a": "No. The comparison runs in this tab using an in-memory set — nothing leaves your device.",
      "q": "Is my list uploaded for cleaning?"
    },
    {
      "a": "Yes — the set-based method stays fast with tens of thousands of lines.",
      "q": "Can it handle a big list?"
    }
   ],
  "goodToKnow": [
    "Blank lines are always dropped, and the summary counts them together with the duplicates removed.",
    "With case-insensitive matching (the default), the first spelling seen is the one kept — Apple first, then apple, keeps Apple.",
   ],
  "privacyKind": "local",
   "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
   "steps": [
     "Paste your list, one item per line.",
     "Choose whether spaces at the edges count, and whether capital and small letters count as the same line.",
       "Pick the order: first appearance, or sorted A to Z.",
    "Press Remove duplicates and copy the cleaned list.",
   ],
   "privacyTitle": "Your list stays on your device"
 },
 "line-sorter": {
   "faq": [
    {
      "a": "Natural sort reads the digits as a number. Plain character-by-character sorting would put Item 10 first, because the character 1 comes before 2.",
     "q": "Why does Item 2 come before Item 10?"
    },
    {
      "a": "Lines without a number are placed after the numbered lines, sorted alphabetically among themselves.",
     "q": "What does numeric sort do with lines that have no number?"
    },
    {
      "a": "Yes — numeric sort reads the first number in each line, so a line like Asha — 42 is sorted by 42.",
     "q": "Can I sort roll numbers or marks lists?"
    }
   ],
  "goodToKnow": [
    "Alphabetical sorting is natural sorting — numbers inside text compare by value, so Item 2 sorts before Item 10.",
   "Shuffling uses the cryptographic random generator, the same fairness method as the dice and number tools on this site."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
    "Paste your list, one item per line.",
   "Choose how to sort: A to Z, Z to A, by length, by the first number in each line, or shuffle.",
   "Choose whether blank lines stay in the result.",
   "Press Sort the lines and copy the result."
  ],
  "privacyTitle": "Your list stays on your device"
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
 ],
 "bmi-calculator": [
  {
   "slug": "bmr-calculator",
   "name": "BMR & Calorie Calculator",
   "description": "Work out your daily calorie needs from your body and activity level."
  },
  {
   "slug": "water-intake-calculator",
   "name": "Water Intake Calculator",
   "description": "Estimate how much water you should drink in a day."
  },
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Your exact age in years, months and days from your date of birth."
  }
 ],
 "compound-interest-calculator": [
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "fd-calculator",
   "name": "FD Calculator",
   "description": "Estimate the maturity value and interest of a fixed deposit."
  },
  {
   "slug": "rd-calculator",
   "name": "RD Calculator",
   "description": "Estimate the maturity value of a monthly recurring deposit."
  },
  {
   "slug": "ppf-calculator",
   "name": "PPF Calculator",
   "description": "Project your Public Provident Fund balance over 15 years and beyond."
  }
 ],
 "fd-calculator": [
  {
   "slug": "rd-calculator",
   "name": "RD Calculator",
   "description": "Estimate the maturity value of a monthly recurring deposit."
  },
  {
   "slug": "ppf-calculator",
   "name": "PPF Calculator",
   "description": "Project your Public Provident Fund balance over 15 years and beyond."
  },
  {
   "slug": "compound-interest-calculator",
   "name": "Compound Interest Calculator",
   "description": "See how a lump sum grows with periodic compounding, year by year."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  }
 ],
 "rd-calculator": [
  {
   "slug": "fd-calculator",
   "name": "FD Calculator",
   "description": "Estimate the maturity value and interest of a fixed deposit."
  },
  {
   "slug": "ppf-calculator",
   "name": "PPF Calculator",
   "description": "Project your Public Provident Fund balance over 15 years and beyond."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "compound-interest-calculator",
   "name": "Compound Interest Calculator",
   "description": "See how a lump sum grows with periodic compounding, year by year."
  }
 ],
 "ppf-calculator": [
  {
   "slug": "fd-calculator",
   "name": "FD Calculator",
   "description": "Estimate the maturity value and interest of a fixed deposit."
  },
  {
   "slug": "rd-calculator",
   "name": "RD Calculator",
   "description": "Estimate the maturity value of a monthly recurring deposit."
  },
  {
   "slug": "income-tax-calculator",
   "name": "Income Tax Calculator India",
   "description": "Estimate income tax for FY 2025-26 under the new and old regimes, side by side."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  }
 ],
 "discount-calculator": [
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Work out percentages, percentage increases and decreases."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "compound-interest-calculator",
   "name": "Compound Interest Calculator",
   "description": "See how a lump sum grows with periodic compounding, year by year."
  }
 ],
 "income-tax-calculator": [
  {
   "slug": "ppf-calculator",
   "name": "PPF Calculator",
   "description": "Project your Public Provident Fund balance over 15 years and beyond."
  },
  {
   "slug": "gst-calculator",
   "name": "GST Calculator",
   "description": "Add GST to a price, or take GST out of an inclusive price."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  },
  {
   "slug": "fd-calculator",
   "name": "FD Calculator",
   "description": "Estimate the maturity value and interest of a fixed deposit."
  }
 ],
 "bmr-calculator": [
  {
   "slug": "bmi-calculator",
   "name": "BMI Calculator",
   "description": "Check your Body Mass Index from your height and weight, with the WHO category."
  },
  {
   "slug": "water-intake-calculator",
   "name": "Water Intake Calculator",
   "description": "Estimate how much water you should drink in a day."
  },
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Your exact age in years, months and days from your date of birth."
  }
 ],
 "cgpa-calculator": [
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Work out percentages, percentage increases and decreases."
  },
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Your exact age in years, months and days from your date of birth."
  },
  {
   "slug": "scientific-calculator",
   "name": "Scientific Calculator",
   "description": "A full scientific calculator with trig, logs, powers and memory."
  }
 ],
 "pregnancy-due-date-calculator": [
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Count the days between any two dates."
  },
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Your exact age in years, months and days from your date of birth."
  },
  {
   "slug": "bmi-calculator",
   "name": "BMI Calculator",
   "description": "Check your Body Mass Index from your height and weight, with the WHO category."
  }
 ],
 "water-intake-calculator": [
  {
   "slug": "bmi-calculator",
   "name": "BMI Calculator",
   "description": "Check your Body Mass Index from your height and weight, with the WHO category."
  },
  {
   "slug": "bmr-calculator",
   "name": "BMR & Calorie Calculator",
   "description": "Work out your daily calorie needs from your body and activity level."
  },
  {
   "slug": "unit-converter",
   "name": "Unit Converter",
   "description": "Convert length, weight, temperature and data size units."
  }
 ],
 "scientific-calculator": [
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Work out percentages, percentage increases and decreases."
  },
  {
   "slug": "unit-converter",
   "name": "Unit Converter",
   "description": "Convert length, weight, temperature and data size units."
  },
  {
   "slug": "cgpa-calculator",
   "name": "CGPA Calculator",
   "description": "Convert CGPA to percentage and percentage to CGPA."
  },
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  }
 ],
 "stopwatch": [
  {
   "slug": "unit-converter",
   "name": "Unit Converter",
   "description": "Convert length, weight, temperature and data size units."
  },
  {
   "slug": "voice-recorder",
   "name": "Voice Recorder",
   "description": "Record from your microphone and download the recording."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Count the days between any two dates."
  }
 ]
});

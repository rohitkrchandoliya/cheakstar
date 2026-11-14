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
  "world-clock": {
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
 "privacyKind": "local",
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
 },
 "currency-converter": {
  "faq": [
   {
    "a": "The European Central Bank daily reference rate, fetched live from the Frankfurter service when you convert. The rate date is printed with every result.",
    "q": "Where does the exchange rate come from?"
   },
   {
    "a": "No. It is a daily reference rate, not a live trading rate. Banks and money-transfer services add their own fee or margin, so the amount you actually receive can differ.",
    "q": "Is this a live trading rate?"
   },
   {
    "a": "The page says so plainly and shows no number. A rate is never guessed, cached as current, or invented.",
    "q": "What happens if the rate cannot load?"
   },
   {
    "a": "30 currencies, including USD, EUR, GBP, INR, AED-adjacent majors and others listed in the From and To menus.",
    "q": "Which currencies are supported?"
   }
  ],
  "goodToKnow": [
   "The rate is the European Central Bank daily reference rate for the date printed with the result — a daily reference rate, not a live trading rate.",
   "The rate is published on weekdays; at a weekend the latest rate is the previous Friday's.",
   "Banks and transfer services add fees or a margin, so the amount you receive can differ from the converted figure."
  ],
  "privacyKind": "lookup",
  "privacyNote": "The amount and currencies you choose are sent to the public Frankfurter rates service to fetch the conversion. No account or personal detail is involved.",
  "privacyTitle": "Rates are fetched from a public service",
  "steps": [
   "Enter the amount to convert.",
   "Choose the From currency and the To currency.",
   "Press Convert — the converted amount, the rate and the rate date appear below.",
   "Press Swap currencies to convert the other way round."
  ]
 },
 "internet-speed-test": {
  "faq": [
   {
    "a": "Your download speed only. It downloads fixed-size test files from Cloudflare and times them, then works out megabits per second.",
    "q": "What does this test measure?"
   },
   {
    "a": "The result depends on your connection, the Cloudflare server you reach, Wi-Fi signal and other devices using the same connection. Running it again a minute later can give a different number.",
    "q": "Why is the number only an estimate?"
   },
   {
    "a": "No. Upload speed needs a server to receive the upload, and there is none here. The page never claims an upload result.",
    "q": "Does it test upload speed?"
   },
   {
    "a": "About 36 MB in total — a 1 MB warm-up run, then 10 MB and 25 MB measured runs. Avoid running it repeatedly on a metered mobile connection.",
    "q": "How much data does a test use?"
   }
  ],
  "goodToKnow": [
   "The number is a download estimate, not a certified measurement.",
   "The reported speed is the average of two measured runs after a small warm-up download.",
   "Wi-Fi signal, other devices on the same connection and the time of day all move the result."
  ],
  "privacyKind": "lookup",
  "privacyNote": "The test downloads public test data from Cloudflare's speed endpoint and times it in your browser. Nothing about you is sent anywhere.",
  "privacyTitle": "Only test data is downloaded",
  "steps": [
   "Press Start speed test.",
   "Wait while the test downloads a small warm-up file and then two measured files.",
   "Read the average download speed and the speed of each run.",
   "Press Start speed test again later for a steadier average."
  ]
 },
 "lorem-ipsum-generator": {
  "faq": [
   {
    "a": "Placeholder text used by designers and printers for centuries. It looks like real writing so a layout can be judged, but it means nothing on purpose.",
    "q": "What is lorem ipsum?"
   },
   {
    "a": "Paragraphs, sentences, single words or a bulleted list — choose the type and how many, and optionally start with the classic Lorem ipsum opening sentence.",
    "q": "What can I generate?"
   },
   {
    "a": "No. It is assembled from Latin-style words in a built-in word bank. It is not a real passage and should be replaced with real words before anything is published.",
    "q": "Is the text real Latin?"
   },
   {
    "a": "Yes. The word bank is built into the page, so generation happens entirely in your browser.",
    "q": "Does it work offline?"
   }
  ],
  "goodToKnow": [
   "Placeholder text has no meaning on purpose — it shows how a layout looks before the real words are written.",
   "The classic opening sentence is the traditional dummy text used by printers and designers.",
   "Generation is limited to 50 paragraphs, sentences or list items, or 5,000 words, so the page stays fast."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the text is assembled on this device and is never uploaded to any server, including Cheakstar.",
  "privacyTitle": "Text is generated on your device",
  "steps": [
   "Choose what to generate: paragraphs, sentences, words or list items.",
   "Set how many you need.",
   "Choose whether to start with the classic Lorem ipsum opening sentence.",
   "Press Generate text and copy the result."
  ]
 },
 "reverse-text": {
  "faq": [
   {
    "a": "Characters turns the whole text backwards letter by letter. Words reverses the order of the words. Lines reverses the order of the lines.",
    "q": "What does each mode do?"
   },
   {
    "a": "Each letter is swapped for a flipped look-alike, so the text reads upside down — a becomes ɐ, e becomes ǝ. A few characters have no flipped match and are left as they are.",
    "q": "What is upside-down mode?"
   },
   {
    "a": "No. Reversal is grapheme-safe: emoji and combined characters stay whole instead of splitting apart.",
    "q": "Will emoji break when reversed?"
   },
   {
    "a": "No. Your text is reversed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   }
  ],
  "goodToKnow": [
   "Reversal is grapheme-safe, so emoji and combined characters stay whole.",
   "Upside-down mode only changes letters that have a flipped look-alike; the rest stay unchanged.",
   "Word mode keeps the spacing between words in place while reversing their order."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "privacyTitle": "Your text never leaves your browser",
  "steps": [
   "Type or paste your text into the box.",
   "Choose whether to reverse by characters, words or lines.",
   "Tick upside-down mode if you want the letters flipped as well.",
   "Press Reverse the text and copy the result."
  ]
 },
 "typing-speed-test": {
  "faq": [
   {
    "a": "60 seconds. The clock starts with your first keystroke and stops at zero.",
    "q": "How long is the test?"
   },
   {
    "a": "One word means five characters. Your words per minute is the number of correctly typed characters divided by five, divided by the minutes spent.",
    "q": "How is WPM worked out?"
   },
   {
    "a": "A fresh passage is given and the test continues, so the full minute is used. Characters from finished passages keep counting.",
    "q": "What happens if I finish the passage early?"
   },
   {
    "a": "No. The test runs entirely in this browser tab and nothing you type is sent to any server or stored.",
    "q": "Is what I type stored or sent anywhere?"
   }
  ],
  "goodToKnow": [
   "WPM follows the standard typing-test rule: five characters count as one word.",
   "Accuracy is the share of typed characters that match the passage.",
   "Wrong characters are shown in red as you type, and the next character is highlighted."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — nothing you type is sent to any server or stored anywhere, including by Cheakstar.",
  "privacyTitle": "Your typing stays on your device",
  "steps": [
   "Press Start test and type the passage shown.",
   "The clock starts with your first keystroke and runs for 60 seconds.",
   "Keep typing — a new passage appears if you finish one early.",
   "When the clock reaches zero, read your WPM, accuracy and error count."
  ]
 },
 "slug-generator": {
  "faq": [
   {
    "a": "The readable part of a page address — for example, how-to-make-coffee in example.com/how-to-make-coffee. It helps readers and search engines understand what the page is about.",
    "q": "What is a slug?"
   },
   {
    "a": "They are converted to plain letters: é becomes e, ü becomes u. Anything that is not a letter or a number is replaced with the separator.",
    "q": "How are accented letters handled?"
   },
   {
    "a": "Turning on Remove common stop words drops small words like a, the, and and of, giving a shorter slug such as make-best-coffee-home.",
    "q": "What do stop words do?"
   },
   {
    "a": "No. The slug is made only in this browser tab and your title is never sent anywhere.",
    "q": "Is my title uploaded?"
   }
  ],
  "goodToKnow": [
   "Slugs are always lowercase, with words joined by hyphens (or underscores if you choose).",
   "A maximum length never ends on a cut word — the slug is trimmed back to the last whole word.",
   "Hyphens are the usual choice for web addresses; underscores are offered for systems that need them."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your title is processed on this device and is never uploaded to any server, including Cheakstar.",
  "privacyTitle": "Your title never leaves your browser",
  "steps": [
   "Type the title or heading.",
   "Choose the separator: hyphen or underscore.",
   "Set a maximum length, or 0 for no limit, and choose whether to remove stop words.",
   "Press Make slug and copy the result."
  ]
 },
 "uuid-generator": {
  "faq": [
   {
    "a": "A Universally Unique Identifier — a 128-bit label like 3f6a1c2e-9b4d-4a7f-8c1e-5d2a6b9e0f31, used as database keys, file names and request IDs because two of them practically never collide.",
    "q": "What is a UUID?"
   },
   {
    "a": "Version 4 is fully random. Version 7 starts with the current time, so IDs sort in the order they were made — useful for database keys that should stay in order.",
    "q": "What is the difference between version 4 and version 7?"
   },
   {
    "a": "Between 1 and 100 in one go.",
    "q": "How many can I generate at once?"
   },
   {
    "a": "Yes. They are made with the browser's Web Crypto API (crypto.randomUUID for version 4 and crypto.getRandomValues for version 7), not with Math.random.",
    "q": "Are the UUIDs really random?"
   }
  ],
  "goodToKnow": [
   "Version 4 UUIDs are fully random; version 7 UUIDs start with the current time and sort in creation order.",
   "The version digit and the variant bits are set correctly, so the IDs are valid UUIDs in either version.",
   "Bulk mode generates up to 100 UUIDs at once, one per line."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — UUIDs are generated on this device with the Web Crypto API and are never uploaded to any server, including Cheakstar.",
  "privacyTitle": "UUIDs are made on your device",
  "steps": [
   "Choose the version: 4 (random) or 7 (time-ordered).",
   "Set how many UUIDs you need, from 1 to 100.",
   "Press Generate UUIDs.",
   "Press Copy all to copy the whole list."
  ]
 },
 "markdown-preview": {
  "faq": [
   {
    "a": "A plain-text way of writing formatted documents — # for a heading, **bold** for bold, - for a list item. This tool shows the formatted result as you type.",
    "q": "What is Markdown?"
   },
   {
    "a": "Yes. The rendered HTML is cleaned with DOMPurify before it is shown, so any script or unsafe tag in the Markdown is stripped out.",
    "q": "Is the preview safe to look at?"
   },
   {
    "a": "Yes. Press Copy rendered HTML to copy the cleaned HTML for use in a blog post or page.",
    "q": "Can I copy the rendered HTML?"
   },
   {
    "a": "The page says so plainly and shows no preview, instead of showing a broken result. Check your connection and reload the page.",
    "q": "What happens if the editor libraries cannot load?"
   }
  ],
  "goodToKnow": [
   "The preview is rendered with the marked library and then cleaned with DOMPurify before it is shown.",
   "Sanitisation is mandatory: Markdown can never inject a script into this page.",
   "Your text is processed in this browser tab and is never sent to any server."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar. The marked and DOMPurify libraries load from a public CDN.",
  "privacyTitle": "Your text never leaves your browser",
  "steps": [
   "Type or paste Markdown in the left box.",
   "Watch the formatted preview appear on the right as you type.",
   "Press Copy rendered HTML to copy the cleaned HTML.",
   "Press Clear to start over."
  ]
 },
 "code-formatter": {
  "faq": [
   {
    "a": "JavaScript, HTML and CSS. Formatting uses the js-beautify parser.",
    "q": "Which languages can I format?"
   },
   {
    "a": "With Terser, which removes comments and whitespace. HTML and CSS minifying here is a simple whitespace minifier, not a full parser — check the result before shipping it.",
    "q": "How does JavaScript minifying work?"
   },
   {
    "a": "No. Formatting only fixes spacing and line breaks; the code itself is unchanged.",
    "q": "Does formatting change what my code does?"
   },
   {
    "a": "Neither. Your code is processed in this browser tab and never sent to any server, and the page never runs your code — there is no eval anywhere.",
    "q": "Is my code uploaded or run?"
   }
  ],
  "goodToKnow": [
   "Formatting never changes what the code does — only spacing and line breaks.",
   "JavaScript minifying with Terser removes comments and whitespace and shortens local names where safe.",
   "HTML and CSS minifying is a simple whitespace minifier, not a full parser, so check the result before shipping."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your code is processed on this device and is never uploaded to any server, including Cheakstar. The js-beautify and Terser libraries load from a public CDN.",
  "privacyTitle": "Your code never leaves your device",
  "steps": [
   "Choose the language: JavaScript, HTML or CSS.",
   "Choose Format (beautify) or Minify.",
   "Paste your code and press Format code or Minify code.",
   "Copy the result when it appears."
  ]
 },
 "regex-tester": {
  "faq": [
   {
    "a": "A pattern for matching text — for example, \\d+ matches one or more digits. This tool tests your pattern against text you paste and highlights every match.",
    "q": "What is a regular expression?"
   },
   {
    "a": "g finds all matches instead of the first, i ignores case, m makes ^ and $ work per line, s lets . match newlines, and u turns on Unicode mode.",
    "q": "What do the flags do?"
   },
   {
    "a": "Parts of the pattern in round brackets. Each match lists the text its groups captured, so you can see exactly what each bracket matched.",
    "q": "What are groups?"
   },
   {
    "a": "Yes, if it is very complex — the browser runs the test on its main thread. The page limits test text to 50,000 characters and shows 200 matches at most; if a test hangs, reload the page.",
    "q": "Can a pattern freeze the page?"
   }
  ],
  "goodToKnow": [
   "The tester uses JavaScript's own regular-expression engine — the same engine a web page would use.",
   "Patterns with nested repeats, such as (a+)+$, are the classic slow case — keep test text short while building one.",
   "Matches are highlighted in the test text and each match's captured groups are listed below."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your pattern and test text are processed on this device and are never uploaded to any server, including Cheakstar.",
  "privacyTitle": "Your pattern stays on your device",
  "steps": [
   "Type a regular expression in the pattern box.",
   "Tick the flags you need: g, i, m, s or u.",
   "Paste test text below the pattern.",
   "Read the highlighted matches and the captured groups for each match."
  ]
 },
 "timestamp-converter": {
  "faq": [
   {
    "a": "The number of seconds since 1 January 1970 (the epoch). For example, 1700000000 is 14 November 2023, 22:13:20 UTC, and 0 is the epoch itself.",
    "q": "What is a Unix timestamp?"
   },
   {
    "a": "Both are used. Auto-detect treats values of 1,000,000,000,000 or more as milliseconds and smaller values as seconds — current timestamps are about 1.7 billion seconds or 1.7 trillion milliseconds.",
    "q": "Seconds or milliseconds?"
   },
   {
    "a": "Yes. Pick a date and time in the Date to timestamp section and press Convert to timestamp.",
    "q": "Can I convert a date back to a timestamp?"
   },
   {
    "a": "The local time shown is your device's time zone. UTC and ISO 8601 are shown alongside it so the same moment can be compared anywhere.",
    "q": "Which time zone is used?"
   }
  ],
  "goodToKnow": [
   "Auto-detect treats values of 1,000,000,000,000 or more as milliseconds and smaller values as seconds.",
   "Dates before 1970 give negative timestamps, which are valid.",
   "The current timestamp at the top of the page updates every second."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the conversion is calculated on this device and nothing is uploaded to any server, including Cheakstar.",
  "privacyTitle": "Calculated on your device",
  "steps": [
   "Paste a Unix timestamp, or read the live one at the top of the page.",
   "Choose seconds, milliseconds or auto-detect.",
   "Press Convert to date and read the local time, UTC and ISO 8601.",
   "To go the other way, pick a date and time and press Convert to timestamp."
  ]
 },
 "jwt-decoder": {
  "faq": [
   {
    "a": "A JSON Web Token — three base64url parts separated by dots (header.payload.signature). The header and payload are readable JSON; the signature proves who issued it.",
    "q": "What is a JWT?"
   },
   {
    "a": "No. Decoding only reads the token — it never checks the signature, so a decoded token may still be forged or expired. Never trust a token on the basis of decoding alone.",
    "q": "Does decoding verify the token?"
   },
   {
    "a": "No. Decoding happens only in this browser tab, and this page makes no network request at all. Even so, treat a real token like a password and do not paste a live production token into any website unless you are sure it is safe.",
    "q": "Is my token sent anywhere?"
   },
   {
    "a": "It is worked out from the exp claim in the payload: expired, expiring in a number of seconds, or no expiry claim present.",
    "q": "What does the expiry status mean?"
   }
  ],
  "goodToKnow": [
   "Decoding is not verification: anyone can forge the contents of an unsigned or wrongly signed token.",
   "The signature part is shown but never checked — this page only reads the token.",
   "Expiry is worked out from the exp claim; issued-at (iat) and not-before (nbf) are shown when present."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your token is decoded on this device and is never sent to any server. This page makes no network request at all.",
  "privacyTitle": "Your token never leaves this device",
  "steps": [
   "Paste a JWT (header.payload.signature) into the box.",
   "Press Decode token.",
   "Read the header and payload as JSON, with the expiry status.",
   "Press Clear to remove the token from the page."
  ]
 },
 "color-palette-generator": {
  "faq": [
   {
    "a": "A set of colours that work together by their positions on the colour wheel — complementary pairs sit opposite each other, analogous colours sit side by side, and triadic colours sit 120 degrees apart.",
    "q": "What is a colour harmony?"
   },
   {
    "a": "Click any swatch to copy its HEX code, then paste it into your design, document or stylesheet.",
    "q": "How do I use a colour?"
   },
   {
    "a": "No. Always check that text on a colour has enough contrast before using it for headings or buttons.",
    "q": "Does a pretty palette mean readable text?"
   },
   {
    "a": "Yes. Press Random base colour to pick a fresh starting colour, then choose a harmony.",
    "q": "Can I start from a random colour?"
   }
  ],
  "goodToKnow": [
   "Harmonies are worked out from the colour wheel — complementary, analogous, triadic, split-complementary, tetradic and monochromatic.",
   "Every palette has five colours, each with a HEX code you can copy with one click.",
   "A pretty palette is not a guarantee of readable text — check contrast before using a colour for text."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — palettes are worked out on this device and nothing is uploaded to any server, including Cheakstar.",
  "privacyTitle": "Palettes are made on your device",
  "steps": [
   "Pick a base colour with the colour picker, or type a HEX code.",
   "Choose a harmony: complementary, analogous, triadic, split-complementary, tetradic or monochromatic.",
   "Press Generate palette.",
   "Click any swatch to copy its HEX code."
  ]
 },
 "barcode-generator": {
  "faq": [
   {
    "a": "CODE128 suits most labels and inventory tags and accepts letters and numbers. EAN-13 is the retail standard for products sold in shops, and UPC is its North American counterpart. CODE39 is an older format still used for assets and badges.",
    "q": "Which format should I use?"
   },
   {
    "a": "EAN-13 needs 12 or 13 digits. With 12 digits the tool works out the check digit for you; with 13, the last digit must be the correct check digit — if it is wrong, the tool says so and shows the right one.",
    "q": "Why was my EAN-13 rejected?"
   },
   {
    "a": "The barcode itself is a standard, correctly formed code. Selling in a shop usually also needs an officially registered product number (such as a GS1 GTIN) — this tool draws the bars, it does not register numbers.",
    "q": "Will shops accept these barcodes?"
   }
  ],
  "goodToKnow": [
   "Barcodes are drawn in your browser with the JsBarcode library — the text you type is never uploaded.",
   "The PNG download is rendered at three times display size so it prints sharply.",
   "Always print and test-scan a barcode once before printing a full batch of labels."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — nothing you encode is sent to any server.",
  "privacyTitle": "Your text stays on your device",
  "steps": [
   "Choose the barcode format: CODE128, EAN-13, UPC or CODE39.",
   "Type the text or numbers to encode.",
   "Press Generate barcode and check the preview.",
   "Download the barcode as a PNG or SVG file."
  ]
 },
 "image-to-base64": {
  "faq": [
   {
    "a": "A data URL embeds an image directly inside HTML, CSS or JSON, so no separate image file is needed. It is handy for small icons, email templates and API payloads.",
    "q": "What is a data URL used for?"
   },
   {
    "a": "Yes — Base64 text is about a third larger than the image file itself. This tool shows the exact character count and the size increase so you can decide.",
    "q": "Does Base64 make the file bigger?"
   },
   {
    "a": "No. The conversion runs in your browser with the FileReader API; the image never leaves this device.",
    "q": "Is my image uploaded?"
   }
  ],
  "goodToKnow": [
   "A plain Base64 string without a prefix is treated as a PNG when decoding — the preview tells you if it cannot be read as an image.",
   "Very large images produce very long strings; some apps and mail clients truncate pasted text, so test big images once.",
   "The download of a decoded image uses the file type from its data URL prefix."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — no image or string is sent to any server.",
  "privacyTitle": "Your image never leaves this device",
  "steps": [
   "Choose an image file to convert it to a Base64 data URL.",
   "Copy the data URL, or just the Base64 text, from the output box.",
   "To go the other way, paste a Base64 string or data URL into the second box.",
   "Press Preview to see the decoded image, then download it if you need the file."
  ]
 },
 "meme-generator": {
  "faq": [
   {
    "a": "This tool works only with an image you choose from your device. It does not provide or copy anyone else's template images.",
    "q": "Can I use the meme templates I see online?"
   },
   {
    "a": "Captions are automatically made smaller until they fit the width of the image, so the whole line stays visible.",
    "q": "Why did my long caption shrink?"
   },
   {
    "a": "The meme keeps your image's own proportions, capped at 2048 pixels on the longest side so phones can handle it.",
    "q": "What size is the downloaded meme?"
   }
  ],
  "goodToKnow": [
   "Text is drawn in the classic meme style — bold white letters with a black outline — so it stays readable on busy photos.",
   "Editing happens on a canvas in your browser; your photo is never uploaded.",
   "The captions update live as you type, so there is no separate preview step."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed locally and never uploaded.",
  "privacyTitle": "Your photo stays on your device",
  "steps": [
   "Choose your own photo or image.",
   "Type the top and bottom captions.",
   "Adjust the font size slider until the text fits the way you want.",
   "Press Download PNG to save the finished meme."
  ]
 },
 "collage-maker": {
  "faq": [
   {
    "a": "Every photo is centre-cropped to a square cell, so subjects near the edges of a photo can be cut. Choose photos with the subject near the centre for the best result.",
    "q": "How are the photos fitted into the grid?"
   },
   {
    "a": "The export is 1200 pixels wide; the height depends on the layout and the number of rows your photos need.",
    "q": "What size is the finished collage?"
   },
   {
    "a": "No. The collage is assembled on a canvas in your browser — nothing leaves this device.",
    "q": "Are my photos uploaded?"
   }
  ],
  "goodToKnow": [
   "JPEG download is smaller for sharing; PNG keeps the sharpest edges.",
   "The gap slider sets the space between photos, from touching (0) up to 100 pixels.",
   "Photos are placed in the order you selected them, left to right, top to bottom."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photos are processed locally and never uploaded.",
  "privacyTitle": "Your photos stay on your device",
  "steps": [
   "Choose 2 to 9 photos.",
   "Pick a layout and set the gap and background colour.",
   "Press Make collage to build the grid.",
   "Download the collage as a PNG or JPEG."
  ]
 },
 "pdf-watermark": {
  "faq": [
   {
    "a": "No. Your original file is untouched — the tool creates a new watermarked copy for you to download.",
    "q": "Does this change my original PDF?"
   },
   {
    "a": "The text is drawn onto every page as regular page content. Like any PDF edit it is not a security feature — use it to mark drafts and copies, not to protect a document.",
    "q": "Can the watermark be removed later?"
   },
   {
    "a": "Ordinary PDFs work. Password-protected or damaged PDFs cannot be read, and the tool will say so plainly.",
    "q": "Which PDFs are supported?"
   }
  ],
  "goodToKnow": [
   "Stamping uses the open-source pdf-lib library loaded in your browser.",
   "Diagonal stamps are rotated 30 degrees and centred on each page, whatever the page size.",
   "Opacity runs from faint (0.1) to strong (0.9) — 0.3 to 0.5 suits most drafts."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser using pdf-lib — your file is never uploaded to any server.",
  "privacyTitle": "Your PDF stays on your device",
  "steps": [
   "Choose a PDF file.",
   "Type the watermark text and pick a position: diagonal, header or footer.",
   "Set the opacity and font size.",
   "Press Add watermark, then download the stamped copy."
  ]
 },
 "pdf-page-numbers": {
  "faq": [
   {
    "a": "Yes — set the starting number and the pages are numbered from there, which suits a document that follows an earlier part in a separate file.",
    "q": "Can I start numbering from a number other than 1?"
   },
   {
    "a": "No — you download a new copy with the numbers added; your original PDF is untouched.",
    "q": "Does the original file change?"
   },
   {
    "a": "At the position you choose, 36 points (about half an inch) in from the edges of each page.",
    "q": "Where exactly are the numbers placed?"
   }
  ],
  "goodToKnow": [
   "Numbering uses the open-source pdf-lib library in your browser.",
   "Centre positions are worked out from the real text width in Helvetica, so numbers stay centred on any page size.",
   "\"Page X of Y\" counts every page in the file, including the first."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser using pdf-lib — your file is never uploaded to any server.",
  "privacyTitle": "Your PDF stays on your device",
  "steps": [
   "Choose a PDF file.",
   "Pick the number format and position.",
   "Set the starting number if your document does not begin at page 1.",
   "Press Add page numbers, then download the numbered copy."
  ]
 },
 "pdf-delete-pages": {
  "faq": [
   {
    "a": "No. The tool builds a new PDF containing only the pages you kept; your original file is untouched.",
    "q": "Is my original PDF changed?"
   },
   {
    "a": "No — a PDF must keep at least one page, so the tool asks you to unmark at least one page.",
    "q": "Can I delete every page?"
   },
   {
    "a": "Thumbnails are a preview extra drawn when the PDF viewer library loads. If it cannot load, the numbered page list still works and deleting pages is unaffected.",
    "q": "Why did the thumbnails not appear?"
   }
  ],
  "goodToKnow": [
   "Deleting uses the open-source pdf-lib library in your browser.",
   "Pages keep their original order and quality — the kept pages are copied, not re-rendered.",
   "Password-protected or damaged PDFs cannot be opened, and the tool will say so."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser using pdf-lib — your file is never uploaded to any server.",
  "privacyTitle": "Your PDF stays on your device",
  "steps": [
   "Choose a PDF file and wait for the page list.",
   "Tick the pages you want to remove — thumbnails help you recognise them.",
   "Press Delete marked pages.",
   "Download the trimmed PDF."
  ]
 },
 "microphone-test": {
  "faq": [
   {
    "a": "Microphone access always needs your permission. This page only uses the microphone while the test is running, and stopping the test releases it.",
    "q": "Why does the browser ask for permission?"
   },
   {
    "a": "Move closer to the microphone, check the system input level, and make sure the right microphone is selected in your system settings — many laptops default to a quiet built-in mic.",
    "q": "The meter barely moves when I speak. What helps?"
   },
   {
    "a": "No. The short test recording is held in this page only, for playback, and disappears when you leave the page. Nothing is uploaded.",
    "q": "Is my voice recorded or uploaded?"
   }
  ],
  "goodToKnow": [
   "The peak readout remembers the loudest moment, which helps you spot clipping and dropouts.",
   "Headset microphones usually give a steadier level than a laptop's built-in microphone.",
   "If the browser says permission was denied, check the site settings in the address bar to allow it."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the microphone stream and any test recording never leave your device.",
  "privacyTitle": "Your voice stays in this page",
  "steps": [
   "Press Start test and allow microphone access when the browser asks.",
   "Speak at your normal volume and watch the level meter move.",
   "Press Record to capture up to ten seconds, then play it back.",
   "Press Stop test when you are done — the microphone is released."
  ]
 },
 "webcam-test": {
  "faq": [
   {
    "a": "Many webcams advertise a high resolution but deliver less on a busy USB connection or in low light. The readout shows what the camera is really sending right now.",
    "q": "Why does the resolution matter?"
   },
   {
    "a": "No. The preview is drawn locally in your browser; no frame is uploaded. A snapshot is saved only if you press the button, and only to your own device.",
    "q": "Is the camera feed sent anywhere?"
   },
   {
    "a": "Use the camera or site-settings icon in the address bar, allow the camera for this site, then press Start camera again.",
    "q": "The browser blocked my camera. How do I allow it?"
   }
  ],
  "goodToKnow": [
   "Frame rate is shown only when the device reports it — some cameras do not, and the page says so instead of guessing.",
   "Good light in front of you matters more than a better camera for how you look on a call.",
   "Stopping the test turns the camera off and clears the preview."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the camera preview is local and no image is uploaded.",
  "privacyTitle": "Your camera stays on your device",
  "steps": [
   "Press Start camera and allow camera access when the browser asks.",
   "Check your framing, lighting and background in the live preview.",
   "Read the resolution and frame rate your camera actually delivers.",
   "Optionally save a snapshot, then press Stop camera when you finish."
  ]
 },
 "speaker-test": {
  "faq": [
   {
    "a": "Usually the headphones are on the wrong way round, or the speakers are swapped. Turn the headphones around or swap the speaker positions — the test itself is fine.",
    "q": "I heard the left sound on my right side. Is something broken?"
   },
   {
    "a": "440 Hz is the standard tuning note (A4) — a steady, easy-to-hear pitch that plays safely on almost any speaker or headphone.",
    "q": "Why a 440 Hz tone?"
   },
   {
    "a": "No. Every sound is generated live with the Web Audio API in your browser — nothing is downloaded.",
    "q": "Does the page play any file?"
   }
  ],
  "goodToKnow": [
   "Start with the volume low: test tones are pure and can feel louder than music at the same setting.",
   "The sweep climbs from 100 Hz to 1000 Hz over three seconds; a buzz or rattle at one point suggests a loose speaker or grille.",
   "On phones, the left/right test works best with headphones — a single phone speaker cannot separate channels."
  ],
  "privacyKind": "local",
  "privacyNote": "Sounds are generated in your browser with the Web Audio API — no audio file is downloaded and nothing is uploaded.",
  "privacyTitle": "Sounds are made on your device",
  "steps": [
   "Set the volume slider to a comfortable level.",
   "Press the 440 Hz tone to check both sides together.",
   "Press Left channel and Right channel to check each side on its own.",
   "Use the sweep to listen for rattles or dead spots between 100 Hz and 1000 Hz."
  ]
 },
 "gradient-generator": {
  "faq": [
   {
    "a": "A background declaration using linear-gradient or radial-gradient with your colour stops as HEX codes and percentage positions, ready to paste into any CSS file or style block.",
    "q": "What CSS does this generate?"
   },
   {
    "a": "Stops are spaced evenly from 0% to 100% across the gradient. Two stops sit at 0% and 100%; five stops sit at 0%, 25%, 50%, 75% and 100%.",
    "q": "How are the stop positions worked out?"
   },
   {
    "a": "No. The gradient is calculated in your browser and the code is generated on this device.",
    "q": "Is anything uploaded?"
   }
  ],
  "goodToKnow": [
   "HEX codes can be typed directly — short forms like #abc are expanded automatically.",
   "Radial gradients are generated as a circle centred in the preview box.",
   "The preview uses the exact CSS shown in the code box, so what you see is what you paste."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colours are never sent to any server.",
  "privacyTitle": "Made entirely on your device",
  "steps": [
   "Choose linear or radial and set the angle for linear gradients.",
   "Adjust the colour stops — pick colours, add up to five stops, or remove stops down to two.",
   "Watch the preview and the CSS code update as you change anything.",
   "Press Copy CSS and paste the code into your stylesheet."
  ]
 },
 "password-generator": {
  "faq": [
   {
    "a": "They are drawn from your browser's cryptographic random source (crypto.getRandomValues) with rejection sampling, so every character is unbiased. If a browser has no secure random source, the tool refuses rather than falling back to weak randomness.",
    "q": "How random are these passwords?"
   },
   {
    "a": "Only when a password must be read aloud or typed from paper — removing look-alike characters (I, l, 1, O, 0) makes that easier, at a small cost in strength.",
    "q": "Should I exclude ambiguous characters?"
   },
   {
    "a": "In a password manager. A generated password is meant to be unique per account, not memorised or reused.",
    "q": "Where should I keep a generated password?"
   }
  ],
  "goodToKnow": [
   "Every generated password includes at least one character from each set you selected.",
   "Passwords exist only in this page's memory — reloading the page wipes them.",
   "Length matters more than complexity tricks: each extra character multiplies the guessing work."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — passwords are created in this page's memory and are never stored, logged or sent anywhere.",
  "privacyTitle": "Generated here, kept nowhere",
  "steps": [
   "Set the length — 16 or more characters is a good default.",
   "Choose which character sets to include.",
   "Press Generate and copy the password into your password manager.",
   "Use Generate a set when you need several passwords at once."
  ]
 },
 "password-strength-checker": {
  "faq": [
   {
    "a": "By zxcvbn, the open-source estimator from Dropbox. Instead of counting character types, it models how a real attacker guesses: dictionaries, names, dates, keyboard patterns and repeats.",
    "q": "How is the score worked out?"
   },
   {
    "a": "No. zxcvbn runs in this browser tab; the password is never transmitted, stored or logged.",
    "q": "Is my password sent anywhere to check it?"
   },
   {
    "a": "No. Strength and reuse are different risks: a strong password reused on a breached site is still compromised. Every account needs its own password — the Leaked Password Check covers breach lookups.",
    "q": "Does a strong score mean the password is safe to reuse?"
   }
  ],
  "goodToKnow": [
   "Crack times are estimates for a motivated attacker with modern hardware — treat them as comparisons, not promises.",
   "A passphrase of several random words usually scores better than a short string of symbols.",
   "The checker and the generator pair well: check a password idea here, then generate a stronger one."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser using zxcvbn — your password is never sent to any server.",
  "privacyTitle": "Your password never leaves this device",
  "steps": [
   "Type or paste the password you want to judge.",
   "Read the score, from 0 (very weak) to 4 (very strong).",
   "Check the estimated guessing times for online and offline attacks.",
   "Fix anything the feedback names — patterns, dates, names and repeated words are called out."
  ]
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
   "slug": "online-timer",
   "name": "Online Timer",
   "description": "A countdown timer with presets and an audible alarm."
  },
  {
   "slug": "pomodoro-timer",
   "name": "Pomodoro Timer",
   "description": "Focus in 25-minute work sessions with short breaks between them."
  },
  {
   "slug": "countdown-timer",
   "name": "Countdown Timer",
   "description": "Count down the days, hours and minutes to any date or event."
  }
 ],
 "online-timer": [
  {
   "slug": "stopwatch",
   "name": "Stopwatch",
   "description": "A precision stopwatch with laps, best and worst lap highlights."
  },
  {
   "slug": "pomodoro-timer",
   "name": "Pomodoro Timer",
   "description": "Focus in 25-minute work sessions with short breaks between them."
  },
  {
   "slug": "countdown-timer",
   "name": "Countdown Timer",
   "description": "Count down the days, hours and minutes to any date or event."
  },
  {
   "slug": "world-clock",
   "name": "World Clock",
   "description": "Live local time for major cities around the world."
  }
 ],
 "pomodoro-timer": [
  {
   "slug": "online-timer",
   "name": "Online Timer",
   "description": "A countdown timer with presets and an audible alarm."
  },
  {
   "slug": "stopwatch",
   "name": "Stopwatch",
   "description": "A precision stopwatch with laps, best and worst lap highlights."
  },
  {
   "slug": "countdown-timer",
   "name": "Countdown Timer",
   "description": "Count down the days, hours and minutes to any date or event."
  }
 ],
 "world-clock": [
  {
   "slug": "time-zone-converter",
   "name": "Time Zone Converter",
   "description": "Convert a date and time between any two time zones."
  },
  {
   "slug": "countdown-timer",
   "name": "Countdown Timer",
   "description": "Count down the days, hours and minutes to any date or event."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  }
 ],
 "time-zone-converter": [
  {
   "slug": "world-clock",
   "name": "World Clock",
   "description": "Live local time for major cities around the world."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  },
  {
   "slug": "countdown-timer",
   "name": "Countdown Timer",
   "description": "Count down the days, hours and minutes to any date or event."
  }
 ],
 "countdown-timer": [
  {
   "slug": "online-timer",
   "name": "Online Timer",
   "description": "A countdown timer with presets and an audible alarm."
  },
  {
   "slug": "date-difference-calculator",
   "name": "Date Difference Calculator",
   "description": "Days between two dates, plus add or subtract days from a date."
  },
  {
   "slug": "world-clock",
   "name": "World Clock",
   "description": "Live local time for major cities around the world."
  },
  {
   "slug": "age-calculator",
   "name": "Age Calculator",
   "description": "Work out an exact age in years, months and days from a date of birth."
  }
 ],
 "random-number-generator": [
  {
   "slug": "dice-roller",
   "name": "Dice Roller",
   "description": "Roll one to six dice, from a d4 up to a d20."
  },
  {
   "slug": "coin-flip",
   "name": "Coin Flip",
   "description": "Flip a coin online and keep a tally of heads and tails."
  },
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Percentage of a number, percentage change, and one number as a percent of another."
  }
 ],
 "coin-flip": [
  {
   "slug": "dice-roller",
   "name": "Dice Roller",
   "description": "Roll one to six dice, from a d4 up to a d20."
  },
  {
   "slug": "random-number-generator",
   "name": "Random Number Generator",
   "description": "Generate random numbers in any range, with or without repeats."
  },
  {
   "slug": "stopwatch",
   "name": "Stopwatch",
   "description": "A precision stopwatch with laps, best and worst lap highlights."
  }
 ],
 "dice-roller": [
  {
   "slug": "coin-flip",
   "name": "Coin Flip",
   "description": "Flip a coin online and keep a tally of heads and tails."
  },
  {
   "slug": "random-number-generator",
   "name": "Random Number Generator",
   "description": "Generate random numbers in any range, with or without repeats."
  },
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Percentage of a number, percentage change, and one number as a percent of another."
  }
 ],
 "tip-calculator": [
  {
   "slug": "percentage-calculator",
   "name": "Percentage Calculator",
   "description": "Percentage of a number, percentage change, and one number as a percent of another."
  },
  {
   "slug": "discount-calculator",
   "name": "Discount Calculator",
   "description": "Find the final price and your saving after one or two discounts."
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
  }
 ],
 "loan-amortization-calculator": [
  {
   "slug": "emi-calculator",
   "name": "EMI Calculator",
   "description": "Monthly instalment, total interest and total payment for any loan."
  },
  {
   "slug": "compound-interest-calculator",
   "name": "Compound Interest Calculator",
   "description": "See how a lump sum grows with periodic compounding, year by year."
  },
  {
   "slug": "fd-calculator",
   "name": "FD Calculator",
   "description": "Estimate the maturity value and interest of a fixed deposit."
  },
  {
   "slug": "sip-calculator",
   "name": "SIP Calculator",
   "description": "Future value of a monthly investment: how much you put in vs how much it grows."
  }
 ],
 "text-repeater": [
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
   "slug": "remove-duplicate-lines",
   "name": "Remove Duplicate Lines",
   "description": "Remove repeated lines from a list and keep each line once."
  }
 ],
 "remove-duplicate-lines": [
  {
   "slug": "line-sorter",
   "name": "Line Sorter",
   "description": "Sort lines alphabetically, by length, numerically, or shuffle them."
  },
  {
   "slug": "case-converter",
   "name": "Case Converter & Line Tools",
   "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
  },
  {
   "slug": "text-repeater",
   "name": "Text Repeater",
   "description": "Repeat a word, phrase or sentence as many times as you need."
  },
  {
   "slug": "word-counter",
   "name": "Word & Character Counter",
   "description": "Count words, characters, sentences and reading time as you type."
  }
 ],
 "line-sorter": [
  {
   "slug": "remove-duplicate-lines",
   "name": "Remove Duplicate Lines",
   "description": "Remove repeated lines from a list and keep each line once."
  },
  {
   "slug": "case-converter",
   "name": "Case Converter & Line Tools",
   "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
  },
  {
   "slug": "text-repeater",
   "name": "Text Repeater",
   "description": "Repeat a word, phrase or sentence as many times as you need."
  },
  {
   "slug": "word-counter",
   "name": "Word & Character Counter",
   "description": "Count words, characters, sentences and reading time as you type."
  }
 ],
 "currency-converter": [
   {
    "slug": "unit-converter",
    "name": "Unit Converter",
    "description": "Convert length, weight, temperature and data size units."
   },
   {
    "slug": "tip-calculator",
    "name": "Tip Calculator",
    "description": "Work out the tip and split the bill fairly between friends."
   },
   {
    "slug": "time-zone-converter",
    "name": "Time Zone Converter",
    "description": "Convert a date and time between any two time zones."
   },
   {
    "slug": "world-clock",
    "name": "World Clock",
    "description": "Live local time for major cities around the world."
   }
 ],
 "internet-speed-test": [
   {
    "slug": "whats-my-ip",
    "name": "What's My IP",
    "description": "See your own public IP address, location and internet provider."
   },
   {
    "slug": "ip-lookup",
    "name": "IP Address Lookup",
    "description": "Find the country, city, ISP and network of any IPv4 or IPv6 address."
   },
   {
    "slug": "dns-lookup",
    "name": "DNS Lookup",
    "description": "Find the DNS records (A, AAAA, MX, TXT, NS, CNAME, SOA) of any domain."
   },
   {
    "slug": "security-headers-check",
    "name": "Website Security Headers Check",
    "description": "Grade a website's security headers with the free MDN Observatory service."
   }
 ],
 "lorem-ipsum-generator": [
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
    "slug": "text-repeater",
    "name": "Text Repeater",
    "description": "Repeat a word, phrase or sentence as many times as you need."
   },
   {
    "slug": "line-sorter",
    "name": "Line Sorter",
    "description": "Sort lines alphabetically, by length, numerically, or shuffle them."
   }
 ],
 "reverse-text": [
   {
    "slug": "case-converter",
    "name": "Case Converter & Line Tools",
    "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
   },
   {
    "slug": "text-repeater",
    "name": "Text Repeater",
    "description": "Repeat a word, phrase or sentence as many times as you need."
   },
   {
    "slug": "word-counter",
    "name": "Word & Character Counter",
    "description": "Count words, characters, sentences and reading time as you type."
   },
   {
    "slug": "line-sorter",
    "name": "Line Sorter",
    "description": "Sort lines alphabetically, by length, numerically, or shuffle them."
   }
 ],
 "typing-speed-test": [
   {
    "slug": "word-counter",
    "name": "Word & Character Counter",
    "description": "Count words, characters, sentences and reading time as you type."
   },
   {
    "slug": "text-repeater",
    "name": "Text Repeater",
    "description": "Repeat a word, phrase or sentence as many times as you need."
   },
   {
    "slug": "line-sorter",
    "name": "Line Sorter",
    "description": "Sort lines alphabetically, by length, numerically, or shuffle them."
   },
   {
    "slug": "case-converter",
    "name": "Case Converter & Line Tools",
    "description": "Change text case, remove duplicate lines, sort lines and clean up spaces."
   }
 ],
 "slug-generator": [
   {
    "slug": "url-encoder-decoder",
    "name": "URL Encoder & Decoder",
    "description": "Encode or decode URL (percent-encoded) text safely."
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
   },
   {
    "slug": "word-counter",
    "name": "Word & Character Counter",
    "description": "Count words, characters, sentences and reading time as you type."
   }
 ],
 "uuid-generator": [
   {
    "slug": "random-number-generator",
    "name": "Random Number Generator",
    "description": "Generate random numbers in any range, with or without repeats."
   },
   {
    "slug": "json-formatter",
    "name": "JSON Formatter & Validator",
    "description": "Pretty-print JSON and pinpoint the error when it is invalid."
   },
   {
    "slug": "base64-encoder-decoder",
    "name": "Base64 Encoder & Decoder",
    "description": "Encode or decode Base64, for text and for files."
   },
   {
    "slug": "slug-generator",
    "name": "Slug Generator",
    "description": "Turn a title into a clean, lowercase URL slug."
   }
 ],
 "markdown-preview": [
   {
    "slug": "json-formatter",
    "name": "JSON Formatter & Validator",
    "description": "Pretty-print JSON and pinpoint the error when it is invalid."
   },
   {
    "slug": "text-to-pdf",
    "name": "Text to PDF",
    "description": "Type or paste text and download it as a clean PDF."
   },
   {
    "slug": "word-counter",
    "name": "Word & Character Counter",
    "description": "Count words, characters, sentences and reading time as you type."
   },
   {
    "slug": "slug-generator",
    "name": "Slug Generator",
    "description": "Turn a title into a clean, lowercase URL slug."
   }
 ],
 "code-formatter": [
   {
    "slug": "json-formatter",
    "name": "JSON Formatter & Validator",
    "description": "Pretty-print JSON and pinpoint the error when it is invalid."
   },
   {
    "slug": "markdown-preview",
    "name": "Markdown Preview",
    "description": "Write Markdown and see the formatted result live."
   },
   {
    "slug": "regex-tester",
    "name": "Regex Tester",
    "description": "Test a regular expression live with match highlighting and groups."
   },
   {
    "slug": "url-encoder-decoder",
    "name": "URL Encoder & Decoder",
    "description": "Encode or decode URL (percent-encoded) text safely."
   }
 ],
 "regex-tester": [
   {
    "slug": "json-formatter",
    "name": "JSON Formatter & Validator",
    "description": "Pretty-print JSON and pinpoint the error when it is invalid."
   },
   {
    "slug": "code-formatter",
    "name": "Code Formatter & Minifier",
    "description": "Format JavaScript, HTML or CSS, or minify JavaScript."
   },
   {
    "slug": "text-diff-checker",
    "name": "Text Diff Checker",
    "description": "Compare two texts line by line: what was added, removed or kept."
   },
   {
    "slug": "url-encoder-decoder",
    "name": "URL Encoder & Decoder",
    "description": "Encode or decode URL (percent-encoded) text safely."
   }
 ],
 "timestamp-converter": [
   {
    "slug": "date-difference-calculator",
    "name": "Date Difference Calculator",
    "description": "Days between two dates, plus add or subtract days from a date."
   },
   {
    "slug": "time-zone-converter",
    "name": "Time Zone Converter",
    "description": "Convert a date and time between any two time zones."
   },
   {
    "slug": "world-clock",
    "name": "World Clock",
    "description": "Live local time for major cities around the world."
   },
   {
    "slug": "countdown-timer",
    "name": "Countdown Timer",
    "description": "Count down the days, hours and minutes to any date or event."
   }
 ],
 "jwt-decoder": [
   {
    "slug": "base64-encoder-decoder",
    "name": "Base64 Encoder & Decoder",
    "description": "Encode or decode Base64, for text and for files."
   },
   {
    "slug": "json-formatter",
    "name": "JSON Formatter & Validator",
    "description": "Pretty-print JSON and pinpoint the error when it is invalid."
   },
   {
    "slug": "password-breach-check",
    "name": "Leaked Password Check",
    "description": "Check a password against real breach data — without sending the password anywhere."
   },
   {
    "slug": "uuid-generator",
    "name": "UUID Generator",
    "description": "Generate version 4 or version 7 UUIDs, one at a time or in bulk."
   }
 ],
 "color-palette-generator": [
   {
    "slug": "color-picker-from-image",
    "name": "Color Picker from Image",
    "description": "Click any point of an image to get the exact HEX and RGB colour there."
   },
   {
    "slug": "favicon-generator",
    "name": "Favicon Generator",
    "description": "Turn an image into a favicon set: an ICO file plus PNG icons in common sizes."
   },
   {
    "slug": "image-information",
    "name": "Image Information",
    "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
   },
   {
    "slug": "qr-code-generator",
    "name": "QR Code Generator",
    "description": "Create QR codes for links, text, Wi-Fi, UPI and contact cards."
   },
   {
    "slug": "color-harmony-generator",
    "name": "Color Harmony Generator",
    "description": "Build colour harmonies from one base colour, fine-tuned with perceptual OKLCH sliders."
   }
 ],
 "barcode-generator": [
  {
   "slug": "qr-code-generator",
   "name": "QR Code Generator",
   "description": "Create QR codes for links, text, Wi-Fi, UPI and contact cards."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "passport-photo-maker",
   "name": "Passport Photo Maker",
   "description": "Crop a photo to 35 x 45 mm and download it, plus a 4 x 6 inch sheet of 8 copies."
  },
  {
   "slug": "text-to-pdf",
   "name": "Text to PDF",
   "description": "Type or paste text and download it as a clean PDF."
  }
 ],
 "image-to-base64": [
  {
   "slug": "base64-encoder-decoder",
   "name": "Base64 Encoder & Decoder",
   "description": "Encode or decode Base64, for text and for files."
  },
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "json-formatter",
   "name": "JSON Formatter & Validator",
   "description": "Pretty-print JSON and pinpoint the error when it is invalid."
  }
 ],
 "meme-generator": [
  {
   "slug": "collage-maker",
   "name": "Photo Collage Maker",
   "description": "Combine your photos into one grid collage."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  },
  {
   "slug": "gif-maker",
   "name": "GIF Maker",
   "description": "Turn the first seconds of a video into an animated GIF."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  }
 ],
 "collage-maker": [
  {
   "slug": "meme-generator",
   "name": "Meme Generator",
   "description": "Add captions to your own photo and download the meme."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  },
  {
   "slug": "passport-photo-maker",
   "name": "Passport Photo Maker",
   "description": "Crop a photo to 35 x 45 mm and download it, plus a 4 x 6 inch sheet of 8 copies."
  },
  {
   "slug": "image-splitter",
   "name": "Image Splitter",
   "description": "Cut an image into a grid of equal tiles — for Instagram carousels, puzzle posts and print layouts — and download them one by one or all together as a ZIP."
  }
 ],
 "pdf-watermark": [
  {
   "slug": "pdf-page-numbers",
   "name": "Add Page Numbers to PDF",
   "description": "Add page numbers to a PDF, on your device."
  },
  {
   "slug": "pdf-delete-pages",
   "name": "Delete Pages from PDF",
   "description": "Remove pages from a PDF and download the trimmed file."
  },
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "text-to-pdf",
   "name": "Text to PDF",
   "description": "Type or paste text and download it as a clean PDF."
  }
 ],
 "pdf-page-numbers": [
  {
   "slug": "pdf-watermark",
   "name": "Add Watermark to PDF",
   "description": "Stamp text on every page of a PDF, on your device."
  },
  {
   "slug": "pdf-delete-pages",
   "name": "Delete Pages from PDF",
   "description": "Remove pages from a PDF and download the trimmed file."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  }
 ],
 "pdf-delete-pages": [
  {
   "slug": "pdf-watermark",
   "name": "Add Watermark to PDF",
   "description": "Stamp text on every page of a PDF, on your device."
  },
  {
   "slug": "pdf-page-numbers",
   "name": "Add Page Numbers to PDF",
   "description": "Add page numbers to a PDF, on your device."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "microphone-test": [
  {
   "slug": "webcam-test",
   "name": "Webcam Test",
   "description": "See your camera preview and check it before a call."
  },
  {
   "slug": "speaker-test",
   "name": "Speaker / Headphone Test",
   "description": "Play test sounds to check your speakers or headphones."
  },
  {
   "slug": "voice-recorder",
   "name": "Voice Recorder",
   "description": "Record from your microphone and download the recording."
  },
  {
   "slug": "screen-recorder",
   "name": "Screen Recorder",
   "description": "Record your screen, with optional microphone sound, and download the video."
  }
 ],
 "webcam-test": [
  {
   "slug": "microphone-test",
   "name": "Microphone Test",
   "description": "Test your microphone with a live level meter and playback."
  },
  {
   "slug": "speaker-test",
   "name": "Speaker / Headphone Test",
   "description": "Play test sounds to check your speakers or headphones."
  },
  {
   "slug": "screen-recorder",
   "name": "Screen Recorder",
   "description": "Record your screen, with optional microphone sound, and download the video."
  },
  {
   "slug": "voice-recorder",
   "name": "Voice Recorder",
   "description": "Record from your microphone and download the recording."
  }
 ],
 "speaker-test": [
  {
   "slug": "microphone-test",
   "name": "Microphone Test",
   "description": "Test your microphone with a live level meter and playback."
  },
  {
   "slug": "webcam-test",
   "name": "Webcam Test",
   "description": "See your camera preview and check it before a call."
  },
  {
   "slug": "audio-converter",
   "name": "Audio Converter",
   "description": "Convert audio between MP3, WAV, M4A and OGG, with trim, speed and loudness options."
  },
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  }
 ],
 "gradient-generator": [
  {
   "slug": "color-palette-generator",
   "name": "Color Palette Generator",
   "description": "Build harmonious colour palettes from one base colour."
  },
  {
   "slug": "color-picker-from-image",
   "name": "Color Picker from Image",
   "description": "Click any point of an image to get the exact HEX and RGB colour there."
  },
  {
   "slug": "favicon-generator",
   "name": "Favicon Generator",
   "description": "Turn an image into a favicon set: an ICO file plus PNG icons in common sizes."
  },
  {
   "slug": "code-formatter",
   "name": "Code Formatter & Minifier",
   "description": "Format JavaScript, HTML or CSS, or minify JavaScript."
  },
  {
   "slug": "color-converter",
   "name": "Color Converter",
   "description": "Convert one colour into every format at once — HEX, RGB, HSL, HSV, CMYK, OKLCH, Lab and its nearest CSS colour name."
  }
 ],
 "password-generator": [
  {
   "slug": "password-strength-checker",
   "name": "Password Strength Checker",
   "description": "Check how strong a password really is, privately on your device."
  },
  {
   "slug": "password-breach-check",
   "name": "Leaked Password Check",
   "description": "Check a password against real breach data — without sending the password anywhere."
  },
  {
   "slug": "uuid-generator",
   "name": "UUID Generator",
   "description": "Generate version 4 or version 7 UUIDs, one at a time or in bulk."
  },
  {
   "slug": "file-hash-checker",
   "name": "File Hash Checker",
   "description": "Get the SHA-256 and MD5 hash of any file, for verifying downloads."
  }
 ],
 "password-strength-checker": [
  {
   "slug": "password-generator",
   "name": "Password Generator",
   "description": "Generate strong random passwords on your device."
  },
  {
   "slug": "password-breach-check",
   "name": "Leaked Password Check",
   "description": "Check a password against real breach data — without sending the password anywhere."
  },
  {
   "slug": "email-breach-check",
   "name": "Email Breach Check",
   "description": "Check whether an email address has appeared in known data breaches."
  },
  {
   "slug": "security-headers-check",
   "name": "Website Security Headers Check",
   "description": "Grade a website's security headers with the free MDN Observatory service."
  }
 ]
});

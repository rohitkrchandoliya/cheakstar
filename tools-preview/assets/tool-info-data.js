/* Cheakstar Tools — per-tool information data (generated, part 1 of 2). Consumed by tool-info.js. Part 2 lives in tool-info-data-2.js and is loaded by the renderer. */
window.CK_TOOL_INFO = {
 "color-picker-from-image": {
  "faq": [
   {
    "a": "No. Your image is read only in this browser tab and is never uploaded to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "You get the exact HEX and RGB colour at the point you click or tap.",
    "q": "What colour values do I get?"
   },
   {
    "a": "Compressed photos (JPG) blend colours slightly. Picking from a flat colour area gives the most accurate result.",
    "q": "Why does the colour look slightly different from what I expected?"
   },
   {
    "a": "The Choose an image picker accepts image files, as shown by its image/* setting.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "Compressed photos (JPG) blend colours slightly, so a flat colour area gives the most accurate pick.",
   "The tool gives both the HEX and RGB values for the point you click."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to add an image.",
   "Click (or tap) the image at the point where you want the colour.",
   "Read the exact HEX and RGB colour for that point.",
   "Click Copy HEX to copy the HEX value."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "favicon-generator": {
  "faq": [
   {
    "a": "No. Your image is processed only in this browser tab and is never uploaded to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "A favicon.ico file plus PNG icons in common sizes, delivered as a ZIP download.",
    "q": "What do I get in the set?"
   },
   {
    "a": "It is centred on a square canvas, so nothing is stretched.",
    "q": "What if my image is not square?"
   },
   {
    "a": "The Choose an image picker accepts image files, as shown by its image/* setting.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "The set includes a classic favicon.ico plus PNG icons in the sizes browsers, phones and bookmarks ask for.",
   "Non-square images are centred on a square canvas, so nothing is stretched.",
   "A square logo works best, as the page label notes."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image (a square logo works best) to add an image.",
   "Check the image you have chosen is the one you want for the icons.",
   "Click Download full set as ZIP.",
   "Open the ZIP to get the favicon.ico file and the PNG icons."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "file-hash-checker": {
  "faq": [
   {
    "a": "No. The file is read only in this browser tab and is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "You get both the SHA-256 and MD5 hash of the file you choose.",
    "q": "Which hashes do I get?"
   },
   {
    "a": "The whole file is loaded into memory to hash it, so files of hundreds of MB can be slow or fail on small phones. The tool will tell you if that happens.",
    "q": "Why did a very large file fail or run slowly?"
   },
   {
    "a": "Paste the SHA-256 or MD5 from the download site into Compare with an expected hash (optional) and check it matches.",
    "q": "How do I verify a download?"
   }
  ],
  "goodToKnow": [
   "A hash is a file's fingerprint: if even one byte changes, the fingerprint changes completely.",
   "The whole file is loaded into memory to hash it, so very large files (hundreds of MB) can be slow or fail on small phones, and the tool will tell you.",
   "Download sites publish SHA-256 values so you can prove the file you received is the file they sent."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your data is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a file to pick a file.",
   "Read its SHA-256 and MD5 hashes.",
   "If you have an expected value, paste it in Compare with an expected hash (optional).",
   "Compare the result with the hash published by the download site."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "image-compressor": {
  "faq": [
   {
    "a": "No. Your image is processed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "JPG, PNG and WebP images can be added, and the Output format can be Same as input, JPEG, PNG or WebP.",
    "q": "Which formats can I use?"
   },
   {
    "a": "Choose By target size, enter the Target size (KB) the form allows, then compress and download the result.",
    "q": "How do I meet a form upload limit?"
   },
   {
    "a": "Shrinking by quality or to a target size reduces the file size, and the setting you choose controls how the image is compressed.",
    "q": "Will the quality change?"
   }
  ],
  "goodToKnow": [
   "Only JPG, PNG and WebP images are accepted.",
   "You can shrink by a quality level, or set a target size in KB and let the tool find the best fit.",
   "The quality control is shown as Quality: 80 % by default on the page."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to add a JPG, PNG or WebP image.",
   "Choose By quality and set the Quality slider, or choose By target size and enter a Target size (KB).",
   "Choose an Output format: Same as input, JPEG, PNG, or WebP.",
   "Click Compress, then click Download compressed image."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "image-converter": {
  "faq": [
   {
    "a": "No. Your image is processed only in this browser tab and is never sent to any server, including Cheakstar. The file never leaves your device.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "You can add a JPG, PNG or WebP image and convert to JPEG (.jpg), PNG (.png) or WebP (.webp).",
    "q": "Which formats can I use?"
   },
   {
    "a": "No. This tool only converts between JPG, PNG and WebP, as shown in the Convert to options.",
    "q": "Can I convert to other formats?"
   }
  ],
  "goodToKnow": [
   "Conversion is only between JPG, PNG and WebP.",
   "Only JPG, PNG and WebP images are accepted as input."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to add a JPG, PNG or WebP image.",
   "Choose Convert to: JPEG (.jpg), PNG (.png), or WebP (.webp).",
   "Click Convert.",
   "Click Download converted image."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "image-information": {
  "faq": [
   {
    "a": "No. Your image is read only inside your browser and is never uploaded to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "You will see the image's size and dimensions, and for photos the EXIF data recorded by the camera.",
    "q": "What information will I see?"
   },
   {
    "a": "Sometimes. EXIF can include GPS location when the camera recorded it.",
    "q": "Can it show where a photo was taken?"
   },
   {
    "a": "The Choose an image picker accepts image files, as shown by its image/* setting.",
    "q": "Which formats can I use?"
   }
  ],
  "goodToKnow": [
   "For any image you get its file details; for photos you also get the EXIF data recorded by the camera.",
   "EXIF can include the camera model, date taken, exposure settings and sometimes the GPS location.",
   "The image picker accepts image files of any type."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to select an image.",
   "Wait for the image to be read on this device.",
   "View its file details, including size and dimensions.",
   "For a photo, also view the EXIF camera details stored inside it."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "image-resizer-cropper": {
  "faq": [
   {
    "a": "No. Your image is processed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "JPG, PNG and WebP images are accepted.",
    "q": "Which formats can I use?"
   },
   {
    "a": "Yes. Choose Custom size and enter the Width (px) and Height (px) you need.",
    "q": "Can I resize to exact pixels?"
   },
   {
    "a": "Yes. Tick Keep aspect ratio when resizing before you apply the change.",
    "q": "Can I keep the proportions while resizing?"
   }
  ],
  "goodToKnow": [
   "Only JPG, PNG and WebP images are accepted.",
   "Size presets include Passport photo - 2 x 2 inch (600 x 600 px), Passport photo - 35 x 45 mm (413 x 531 px), Photo print - 4 x 6 inch (1200 x 1800 px), Full HD - 1920 x 1080 px, and Square - 1080 x 1080 px.",
   "Crop options include Free crop (no fixed ratio), Square (1:1), 4:3, 3:2, 16:9, and Passport 35 x 45 (7:9)."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to add a JPG, PNG or WebP image.",
   "Choose a Size preset, or enter exact Width (px) and Height (px), and tick Keep aspect ratio when resizing if you want it.",
   "Choose Crop to aspect ratio, from Free crop to a fixed ratio such as Square (1:1) or 16:9.",
   "Click Apply crop & resize, then click Download resized image."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "images-to-pdf": {
  "faq": [
   {
    "a": "No. This runs entirely in your browser and your images are never uploaded to any server, including Cheakstar.",
    "q": "Are my files uploaded?"
   },
   {
    "a": "JPG and PNG images, including .jpg, .jpeg and .png files.",
    "q": "Which formats can I use?"
   },
   {
    "a": "Each image becomes a page, and you can choose A4, Letter (US), or Fit to image size for the pages.",
    "q": "How are the images placed in the PDF?"
   },
   {
    "a": "It is handy for forms that ask for one PDF instead of many photos.",
    "q": "When is this useful?"
   }
  ],
  "goodToKnow": [
   "Only JPG and PNG images are accepted.",
   "Each image becomes one page in the PDF.",
   "This tool uses the open-source pdf-lib library loaded in your browser."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose images (JPG or PNG) to add your images.",
   "Choose a Page size: A4, Letter (US), or Fit to image size.",
   "Click Create PDF from images.",
   "Download the PDF, with one image on each page."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "passport-photo-maker": {
  "faq": [
   {
    "a": "No. Your photo is processed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my photo uploaded?"
   },
   {
    "a": "It is cropped to 35 x 45 mm and downloads as a JPG.",
    "q": "What size is the passport photo?"
   },
   {
    "a": "Download 4 x 6 sheet — 8 copies gives you a 4 x 6 inch sheet with 8 copies for printing.",
    "q": "What is the sheet option?"
   },
   {
    "a": "The Choose a photo picker accepts image files, as shown by its image/* setting.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "The photo is cropped to 35 x 45 mm.",
   "The print option is a 4 x 6 inch sheet with 8 copies, ready for a photo shop.",
   "The single passport photo downloads as a JPG."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a photo to add a photo.",
   "Position the face inside the 35 x 45 mm frame.",
   "Click Download passport photo (JPG) for the single photo.",
   "Or click Download 4 x 6 sheet — 8 copies if you want a print sheet."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "pdf-compressor": {
  "faq": [
   {
    "a": "No. Everything runs in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Yes, depending on the level you choose. High quality keeps pages sharpest, Balanced saves more size, and Smallest file makes pages look softer.",
    "q": "Will the quality change?"
   },
   {
    "a": "If the PDF is already mostly text, this image-based method may not shrink it much and it can even grow.",
    "q": "Why did my PDF not get much smaller?"
   },
   {
    "a": "No. Every page becomes an image, so the text can no longer be selected, copied or searched.",
    "q": "Can I still copy text from the compressed PDF?"
   }
  ],
  "goodToKnow": [
   "This method turns every page into an image, so text in the compressed PDF can no longer be selected, copied or searched.",
   "At the smallest setting, text can look soft.",
   "If a PDF is already mostly text, it may not shrink much and can even grow.",
   "It is best suited to scanned documents and PDFs that a form refuses because of size."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a PDF file to add a PDF.",
   "Choose a Compression level: High quality, Balanced, or Smallest file.",
   "Click Compress PDF.",
   "Download the compressed PDF."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "pdf-merge": {
  "faq": [
   {
    "a": "No. Merging runs entirely in your browser and your files are never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Yes. Use Move up / Move down to set the order before you merge.",
    "q": "Can I change the order of the PDFs?"
   },
   {
    "a": "Only PDF files. The file picker accepts application/pdf and .pdf files.",
    "q": "Which formats can I use?"
   },
   {
    "a": "Password-protected or damaged PDFs cannot be merged, and the tool will say so if a file cannot be used.",
    "q": "Why did the merge fail?"
   }
  ],
  "goodToKnow": [
   "Only PDF files are accepted.",
   "Password-protected or damaged PDFs cannot be merged, and the tool will tell you if that happens.",
   "Merging uses the open-source pdf-lib library loaded in your browser."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose PDF files to add the PDFs you want to combine.",
   "Set the order with Move up / Move down until the files are in the sequence you want.",
   "Click Merge all into one PDF.",
   "Download the single merged PDF."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "pdf-split": {
  "faq": [
   {
    "a": "No. Splitting runs entirely in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "No. The original file is never changed and you always download a new PDF.",
    "q": "Will my original PDF be changed?"
   },
   {
    "a": "Type the pages you want in the format shown on the page, for example 1,3-5.",
    "q": "How do I write the page numbers?"
   },
   {
    "a": "Yes. You can extract the pages you list as a new PDF, or delete those pages and keep the rest.",
    "q": "Can I delete pages instead of extracting them?"
   }
  ],
  "goodToKnow": [
   "Only PDF files are accepted.",
   "The original file is never changed — you always download a new PDF.",
   "Splitting uses the open-source pdf-lib library loaded in your browser."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose PDF files to add a PDF.",
   "Type the pages you want, for example 1,3-5.",
   "Choose to extract just those pages as a new PDF, or to delete those pages and keep the rest.",
   "Download the new PDF that is created."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "pdf-to-images": {
  "faq": [
   {
    "a": "No. Rendering runs entirely in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "You can choose PNG or JPG as the Image format.",
    "q": "Which image formats can I get?"
   },
   {
    "a": "Yes. It renders every page of the PDF, so you can download the pages you need.",
    "q": "Does it convert the whole PDF?"
   },
   {
    "a": "PDF files only. The file picker accepts application/pdf and .pdf files.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "Only PDF files are accepted as input.",
   "Every page of the PDF is rendered as an image.",
   "Rendering uses PDF.js by Mozilla, loaded in your browser."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a PDF file to add a PDF.",
   "Choose an Image format: PNG or JPG.",
   "Click Render pages as images.",
   "Download the pages you need as images."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "pdf-to-text": {
  "faq": [
   {
    "a": "No. Everything runs in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Scanned PDFs contain no stored text because they are pictures of pages, so there is no text to extract. That would need OCR, which this tool does not do.",
    "q": "Why is the result empty?"
   },
   {
    "a": "You can read the extracted text in the preview first, then download it as a .txt file.",
    "q": "What do I get at the end?"
   },
   {
    "a": "PDF files only. The file picker accepts application/pdf and .pdf files.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "Only PDF files are accepted.",
   "This reads the text stored inside the PDF, so scanned PDFs, which are pictures of pages, will come back empty.",
   "This tool does not do OCR, and it uses PDF.js by Mozilla in your browser."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a PDF file to add a PDF.",
   "Click Extract text.",
   "Read the extracted text in the preview under Extracted text and check it looks right.",
   "Click Download .txt to save it as a plain text file."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "resize-image-to-kb": {
  "faq": [
   {
    "a": "No. Your image is processed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "You can choose JPEG (smallest for photos) or WebP as the Output format.",
    "q": "Which formats can I get?"
   },
   {
    "a": "The tool shrinks your image to at or under the Target size (KB) you set.",
    "q": "How exact is the target size?"
   },
   {
    "a": "The Choose an image picker accepts image files, as shown by its image/* setting.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "The tool shrinks your image to at or under the target size you set.",
   "It is made for online forms, for a photo or a signature upload.",
   "Output format options are JPEG and WebP only."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your photo is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose an image to add an image.",
   "Enter the Target size (KB) you need.",
   "Choose an Output format: JPEG (smallest for photos) or WebP.",
   "Click Resize to target size, then click Download resized image."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "rotate-pdf": {
  "faq": [
   {
    "a": "No. Rotation runs entirely in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "No. The original file is never changed and you download a new, rotated PDF.",
    "q": "Will my original PDF be changed?"
   },
   {
    "a": "Yes. Choose Only the pages I list and enter the pages to rotate, for example 1,3-5.",
    "q": "Can I rotate only some pages?"
   },
   {
    "a": "The new angle is added to its current angle, because pages are rotated relative to their current position.",
    "q": "What if a page is already rotated?"
   }
  ],
  "goodToKnow": [
   "Only PDF files are accepted.",
   "The original file is never changed — you download a new, rotated PDF.",
   "Pages are rotated relative to their current angle, so a page that is already rotated gets the new angle added."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a PDF file to add a PDF.",
   "Choose Rotate by: 90 degrees (clockwise), 180 degrees (upside down), or 270 degrees (counter-clockwise).",
   "Choose Which pages: All pages, or Only the pages I list and type the pages, for example 1,3-5.",
   "Click Rotate and download to get the new, rotated PDF."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "text-to-pdf": {
  "faq": [
   {
    "a": "No. Everything runs in your browser and your text is never uploaded to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   },
   {
    "a": "They may not render. The PDF uses Helvetica, which suits plain English text.",
    "q": "Will emoji or special symbols appear in the PDF?"
   },
   {
    "a": "Long lines wrap automatically and long documents flow onto extra pages.",
    "q": "What happens with a long document?"
   },
   {
    "a": "No. Enter the File name without .pdf, as the label on the page shows.",
    "q": "Do I need to add .pdf to the file name?"
   }
  ],
  "goodToKnow": [
   "Font size options are 11 pt, 12 pt, 14 pt and 16 pt.",
   "The PDF uses the standard Helvetica font, which suits plain English text; special symbols and emoji may not render.",
   "Long lines wrap automatically and long documents flow onto extra pages."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Type or paste your text in the Your text box.",
   "Set a File name (without .pdf) and choose a Font size.",
   "Click Create PDF.",
   "Download the PDF that is created."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "zip-extractor": {
  "faq": [
   {
    "a": "No. The ZIP is opened in your browser and is never uploaded anywhere, including to Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Password-protected ZIP files cannot be opened in the browser, and very large ZIPs are limited by your device's memory.",
    "q": "Why did my ZIP fail to open?"
   },
   {
    "a": "No. Folders are shown for context and only files can be downloaded, one by one.",
    "q": "Can I download a whole folder?"
   },
   {
    "a": "ZIP files only, including .zip, application/zip and application/x-zip-compressed.",
    "q": "Which files can I use?"
   }
  ],
  "goodToKnow": [
   "Password-protected ZIP files cannot be opened, because the password format is not supported in the browser.",
   "Very large ZIPs are limited by your device's memory.",
   "Folders are shown for context; only files can be downloaded."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Use Choose a ZIP file to add a ZIP file.",
   "View everything inside the ZIP.",
   "Download the files you need, one by one."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "audio-converter": {
  "faq": [
   {
    "a": "No. Conversion happens in your browser and your file is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "MP3, WAV, M4A (AAC) and OGG (Vorbis), as listed in the Output format options.",
    "q": "Which formats can I convert to?"
   },
   {
    "a": "Normal speed, 0.5x (slower), 1.5x (faster) and 2x (faster).",
    "q": "What speed options are available?"
   },
   {
    "a": "The in-browser engine is single-thread and runs at about 10–20% of native speed, so longer files take noticeably longer.",
    "q": "Why is conversion slow?"
   }
  ],
  "goodToKnow": [
   "Trim uses Start in seconds and End in seconds — leave End blank to convert to the end of the file.",
   "Normalise loudness evens out quiet and loud parts, which the page notes is good for voice recordings and podcasts.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached) and runs single-thread at about 10–20% of native speed, so conversion is not instant.",
   "Files up to about 50 MB work best; files over 100 MB are refused because browser memory is limited."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an audio file using the Choose an audio file picker.",
   "Select an Output format: MP3, WAV, M4A (AAC) or OGG (Vorbis).",
   "Set Speed if needed, and optionally set Start and End under Trim the audio and tick Normalise loudness.",
   "Click Convert audio and download the converted file when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "audio-merger": {
  "faq": [
   {
    "a": "No. Merging happens in your browser and your files are never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "The joined files are saved as one MP3.",
    "q": "What format is the result?"
   },
   {
    "a": "Two or more audio files, played in the order shown after you arrange them.",
    "q": "How many files can I join?"
   },
   {
    "a": "Check total size — the combined size should stay under about 50 MB, and any single file over 100 MB is refused.",
    "q": "Why did merging fail?"
   }
  ],
  "goodToKnow": [
   "The merged result is a single MP3, with files played one after another in the order shown.",
   "Keep the combined size of all files under about 50 MB; any single file over 100 MB is refused.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached) and is single-thread, so merging is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose audio files using the Choose audio files picker — select two or more files.",
   "Arrange the files in the order shown, so they play one after another in that order.",
   "Click Merge into one MP3.",
   "Download the merged MP3 when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "base64-encoder-decoder": {
  "faq": [
   {
    "a": "No. Everything runs in this browser tab. No text or file is sent to any server, including Cheakstar.",
    "q": "Is my text or file uploaded?"
   },
   {
    "a": "Yes. Full Unicode is supported, so Hindi and emoji text work too.",
    "q": "Can I encode non-English text?"
   },
   {
    "a": "Small files up to about 2 MB can be turned into a Base64 string.",
    "q": "How large a file can I encode?"
   },
   {
    "a": "Paste the Base64 into File as Base64, set the file name and File type (MIME), then click Save as file.",
    "q": "How do I save Base64 back as a file?"
   }
  ],
  "goodToKnow": [
   "Full Unicode is supported, so Hindi and emoji text work too.",
   "File encoding is for small files up to about 2 MB, handy for data URIs and testing.",
   "Everything runs in this browser tab using FileReader — no text or file is sent to any server."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "For text: type or paste into Text input, then click Encode to Base64 or Decode from Base64 and check Result.",
   "Click Copy result to copy the text result.",
   "For a file: use Choose a file to encode to fill File as Base64, or paste Base64 there, set Save decoded Base64 as file name and File type (MIME), then click Save as file."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "case-converter": {
  "faq": [
   {
    "a": "No. Your text is processed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   },
   {
    "a": "UPPERCASE, lowercase, Title Case, Sentence case and tOGGLE cASE.",
    "q": "Which case styles are available?"
   },
   {
    "a": "Remove duplicate lines, Sort lines A to Z, Sort lines Z to A, Remove extra spaces, Remove empty lines and Reverse line order.",
    "q": "What line tools are included?"
   },
   {
    "a": "Click Use result as input to make the Result your new input, then click the next button.",
    "q": "How do I apply two changes in a row?"
   }
  ],
  "goodToKnow": [
   "You can chain actions: copy the result, or use Use result as input to apply a line tool next to the converted text.",
   "Line tools work on lines as a whole — sorting, removing duplicates, removing empty lines and reversing line order are separate buttons.",
   "Your text is processed only in this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Type or paste your text into the Your text box.",
   "Click a case button — UPPERCASE, lowercase, Title Case, Sentence case or tOGGLE cASE — and see the result in the Result box.",
   "Use a line tool if needed (Remove duplicate lines, Sort lines A to Z, Sort lines Z to A, Remove extra spaces, Remove empty lines or Reverse line order).",
   "Click Copy result to copy it, or Use result as input to send the result back as input for another tool."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "csv-json-converter": {
  "faq": [
   {
    "a": "No. Your data never leaves this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my data uploaded?"
   },
   {
    "a": "The first row is the header, and each following row becomes one JSON object. All values stay as text, exactly as written.",
    "q": "How does CSV to JSON work?"
   },
   {
    "a": "Paste an array of objects (or an array of arrays). Columns are the keys found across all objects.",
    "q": "What JSON should I paste for JSON to CSV?"
   },
   {
    "a": "Yes — for CSV to JSON, choose JSON spacing: 2 spaces (readable), Compact (one line) or 4 spaces.",
    "q": "Can I control JSON formatting?"
   }
  ],
  "goodToKnow": [
   "For CSV to JSON, the first row is treated as the header and every following row becomes one JSON object; all values stay text, exactly as written in the CSV.",
   "For JSON to CSV, paste an array of objects (or an array of arrays); the columns are the keys found across all objects.",
   "Your data never leaves this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Select Direction: CSV to JSON or JSON to CSV.",
   "If converting CSV to JSON, select JSON spacing: 2 spaces (readable), Compact (one line) or 4 spaces.",
   "Paste your data into the Input box and click Convert.",
   "Review the preview in Result, then click Download result to save it."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "extract-audio": {
  "faq": [
   {
    "a": "No. Extraction runs in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "The audio is saved as an MP3.",
    "q": "What format is the result?"
   },
   {
    "a": "A video file — the picker accepts video/*.",
    "q": "Which files can I use?"
   },
   {
    "a": "The engine is single-thread, so it is slower than a desktop app. Files over 100 MB are refused due to browser memory limits.",
    "q": "Why is it slow or why did a large file fail?"
   }
  ],
  "goodToKnow": [
   "The result is always saved as an MP3, for uses like lectures, interviews, songs and voice notes recorded as video.",
   "The ffmpeg engine loads once in your browser (about 20–31 MB from a public CDN, then cached).",
   "Files up to about 50 MB work best; files over 100 MB are refused, and the single-thread engine is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Wait for the media engine to load, or click Load engine now to load it sooner.",
   "Click Extract audio as MP3.",
   "Download the resulting MP3 when extraction finishes."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "gif-maker": {
  "faq": [
   {
    "a": "No. The GIF is created in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Length is in seconds with a maximum of 15, starting from the Start time you set.",
    "q": "How long can the GIF be?"
   },
   {
    "a": "Choose a lower frames per second (5 fps is smallest) and the 320 px width — smaller settings make much smaller files.",
    "q": "How can I make the GIF file smaller?"
   },
   {
    "a": "The in-browser ffmpeg engine is single-thread, so it is slower than a desktop app.",
    "q": "Why is it slow?"
   }
  ],
  "goodToKnow": [
   "The GIF is made from the start point you set, with Length capped at 15 seconds.",
   "Frames per second options are 5 fps (smallest file), 10 fps (balanced) and 15 fps (smoothest); Width options are 320 px and 480 px — smaller settings make much smaller GIF files.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached); files up to about 50 MB work best and files over 100 MB are refused."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Set Frames per second and Width, then set Start (seconds) and Length (seconds, max 15).",
   "Click Make GIF.",
   "Download the animated GIF when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "json-formatter": {
  "faq": [
   {
    "a": "No. Your JSON is parsed only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my JSON uploaded?"
   },
   {
    "a": "You get a plain-English note about where the problem is, instead of formatted output.",
    "q": "What happens if my JSON is invalid?"
   },
   {
    "a": "2 spaces, 4 spaces, Tab, or Minified (one line).",
    "q": "Which indentation options are available?"
   },
   {
    "a": "Yes — set Object keys to Sort keys A to Z, or Keep original order to leave them as they are.",
    "q": "Can I sort the keys?"
   }
  ],
  "goodToKnow": [
   "Valid JSON is pretty-printed; invalid JSON gets a plain-English note about where the problem is.",
   "Minified (one line) removes readable spacing, while 2 spaces, 4 spaces and Tab add indentation for reading.",
   "Your JSON is parsed only in this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Paste your JSON into the JSON input box.",
   "Select Indentation (2 spaces, 4 spaces, Tab or Minified (one line)) and Object keys (Keep original order or Sort keys A to Z).",
   "Click Format and validate.",
   "Read the Formatted JSON result, or the plain-English error note if the JSON is invalid, then click Copy formatted JSON to copy it."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "media-info": {
  "faq": [
   {
    "a": "No. The file is read only in your browser and is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Any audio or video file your browser file picker accepts — the picker is set to audio/* and video/*.",
    "q": "Which file types can I use?"
   },
   {
    "a": "Duration, resolution, codecs, frame rate, bitrates and audio channels, with fuller codec information from Read full codec details.",
    "q": "What details will I see?"
   },
   {
    "a": "Files over 100 MB are refused due to browser memory limits. Files up to about 50 MB work best.",
    "q": "Why did a large file fail to load?"
   }
  ],
  "goodToKnow": [
   "Nothing is converted — the file is only read to show what is inside it.",
   "The ffmpeg engine loads once in your browser (about 20–31 MB from a public CDN, then cached), and files up to about 50 MB work best.",
   "Files over 100 MB are refused because browser memory is limited, and the single-thread engine is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an audio or video file using the Choose an audio or video file picker.",
   "Wait for the media engine to load, or click Load engine now to load it sooner.",
   "Review the basic details shown for duration, resolution, codecs, frame rate, bitrates and audio channels.",
   "Click Read full codec details if you want the more complete technical readout."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "screen-recorder": {
  "faq": [
   {
    "a": "No. The recording is made only in this browser tab and nothing is uploaded to any server, including Cheakstar.",
    "q": "Is my recording uploaded?"
   },
   {
    "a": "Recordings are WebM files. The page note suggests the Video Converter tool here if you need another format.",
    "q": "What format is the result?"
   },
   {
    "a": "No — iPhone Safari does not offer screen capture to websites. Use the phone's own screen recorder there instead.",
    "q": "Can I record on iPhone Safari?"
   },
   {
    "a": "Tick Also record my microphone (narration) before you start recording.",
    "q": "How do I include my voice?"
   }
  ],
  "goodToKnow": [
   "Recordings are WebM files, which play in browsers and most players.",
   "Screen recording works on desktop browsers (Chrome, Edge, Firefox) and most Android browsers; iPhone Safari does not offer screen capture to websites — use the phone's own screen recorder there.",
   "If you stop from the browser's Stop sharing bar, the recording ends and is saved here the same way as using Stop recording."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your recordings are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Tick Also record my microphone (narration) if you want narration included.",
   "Click Start screen recording and choose what to share when your browser asks.",
   "Click Stop recording when you are finished — or stop from the browser's own Stop sharing bar.",
   "Download the recorded video from this tab."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "text-diff-checker": {
  "faq": [
   {
    "a": "No. Both texts are compared only in this browser tab and are never sent to any server, including Cheakstar.",
    "q": "Is my text uploaded?"
   },
   {
    "a": "Lines only in the first text are shown as removed, lines only in the second as added, and matching lines as unchanged.",
    "q": "How are differences shown?"
   },
   {
    "a": "The comparison is line-based, so an edit inside a line shows the whole original line as removed and the whole new line as added.",
    "q": "Why does one small edit show two full lines?"
   },
   {
    "a": "No — it compares line by line, not word by word.",
    "q": "Does it compare word by word?"
   }
  ],
  "goodToKnow": [
   "The comparison is line-based, so a small edit inside a line shows the whole line as removed plus added.",
   "Both texts are compared only in this browser tab."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your text is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Paste the original text into First text (original).",
   "Paste the changed version into Second text (changed).",
   "Click Compare texts.",
   "Review the result: lines only in the first text show as removed, lines only in the second as added, and matching lines as unchanged."
  ],
  "privacyTitle": "Your text never leaves your browser"
 },
 "video-trimmer": {
  "faq": [
   {
    "a": "No. Trimming happens in your browser and your video is never uploaded to any server, including Cheakstar.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "The cut section is provided as an MP4.",
    "q": "What format is the result?"
   },
   {
    "a": "Enter the Start and End times in seconds in the fields provided.",
    "q": "How do I set the section?"
   },
   {
    "a": "Files over 100 MB are refused because browser memory is limited. Try a smaller or shorter clip.",
    "q": "Why did my video fail?"
   }
  ],
  "goodToKnow": [
   "Only one section is cut per use — set a single Start and End time.",
   "The trimmed result is downloaded as an MP4.",
   "The ffmpeg engine loads once (about 20–31 MB, then cached); files up to about 50 MB work best and files over 100 MB are refused.",
   "Processing uses a single-thread engine, so it is slower than a desktop app."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your files are processed on this device and are never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose a video file using the Choose a video file picker.",
   "Enter Start (seconds) and End (seconds) for the section you want to keep.",
   "Click Trim video.",
   "Download the trimmed section as an MP4 when it is ready."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "color-converter": {
  "faq": [
   {
    "a": "No. The colour you pick is converted only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my colour uploaded?"
   },
   {
    "a": "HEX, RGB, HSL, HSV, CMYK, OKLCH and Lab, plus the nearest CSS colour name — all at once, updating live.",
    "q": "Which formats do I get?"
   },
   {
    "a": "The named CSS colour (such as steelblue or tomato) closest to your colour, so you can use a readable name in your code.",
    "q": "What is the nearest CSS colour name?"
   },
   {
    "a": "Yes. The Transparency (alpha) slider sets the alpha value used by the formats that support one.",
    "q": "Can I convert a transparent colour?"
   }
  ],
  "goodToKnow": [
   "Every format updates live as you pick or type — there is no Convert button.",
   "Each row has its own Copy button, so you can grab exactly the format your code needs.",
   "OKLCH and Lab are included alongside the classic formats, for modern CSS work."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colour is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a colour with the Pick a colour control, or type a HEX code.",
   "Adjust Transparency (alpha) if you need an alpha value.",
   "Read every converted format — HEX, RGB, HSL, HSV, CMYK, OKLCH, Lab and the nearest CSS colour name.",
   "Click Copy on any row to copy exactly that format."
  ],
  "privacyTitle": "Converted on your device only"
 },
 "contrast-checker": {
  "faq": [
   {
    "a": "No. Both colours are checked only in this browser tab and are never sent to any server, including Cheakstar.",
    "q": "Are my colours uploaded?"
   },
   {
    "a": "They are the WCAG contrast levels. AA needs a ratio of at least 4.5:1 for normal text and 3:1 for large text; AAA needs 7:1 and 4.5:1.",
    "q": "What do AA and AAA mean?"
   },
   {
    "a": "Headings at about 24px, or bold text at about 19px and above — the preview on the page shows large text as headings at 24px bold.",
    "q": "What counts as large text?"
   },
   {
    "a": "If the pair fails AA for normal text, the tool works out the smallest change to the text colour that passes — the background stays as it is.",
    "q": "What does the one-click fix change?"
   }
  ],
  "goodToKnow": [
   "The ratio and badges update live as you change either colour.",
   "Both AA and AAA are shown, for normal and large text — four badges in all.",
   "Readable text is not a luxury: visitors with low vision depend on contrast like this."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colours is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Set the Text colour and the Background colour.",
   "Read the Contrast ratio and the WCAG pass/fail badges for normal and large text.",
   "If the pair fails, use the one-click fix to adjust the text colour by the smallest change that passes.",
   "Use Swap colours to test the reverse pairing."
  ],
  "privacyTitle": "Your colours stay on your device"
 },
 "color-blindness-simulator": {
  "faq": [
   {
    "a": "No. The image is processed on this device only — it is never uploaded to any server, including Cheakstar.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "All eight types of colour-vision deficiency — pick one to simulate, or preview a colour through all eight at once.",
    "q": "How many types are covered?"
   },
   {
    "a": "About 1 in 12 men and 1 in 200 women see colours differently.",
    "q": "How common is colour-vision deficiency?"
   },
   {
    "a": "Yes. Choose an image file and a deficiency type, and the simulated copy appears on the canvas next to the original.",
    "q": "Can I simulate a whole image?"
   }
  ],
  "goodToKnow": [
   "A single colour can be previewed through all eight types at once.",
   "Whole images can be simulated too, not just single colours.",
   "Use it to check that meaning is never carried by colour alone — pair colour with labels, icons or patterns."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a colour or type a HEX code to preview it through all eight deficiency types.",
   "Or choose an Image file to simulate a whole picture.",
   "Select a Deficiency type.",
   "Compare the simulated copy on the canvas with the original."
  ],
  "privacyTitle": "Simulated on your device only"
 },
 "tailwind-shade-generator": {
  "faq": [
   {
    "a": "No. Your palette is built only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my colour uploaded?"
   },
   {
    "a": "A full 50–950 scale — eleven shades from the palest tint to the deepest shade of your base colour.",
    "q": "Which shades do I get?"
   },
   {
    "a": "OKLCH is the perceptual colour space Tailwind v4 uses, so the steps look evenly spaced instead of bunching up at one end.",
    "q": "Why is the scale built in OKLCH?"
   },
   {
    "a": "CSS variables in HEX, CSS variables in OKLCH, and a Tailwind config as a JS object — each with its own copy button.",
    "q": "What can I export?"
   }
  ],
  "goodToKnow": [
   "Clicking any swatch copies its HEX code.",
   "The scale is built in OKLCH, so the steps look evenly spaced to the eye.",
   "All three exports are generated from the same scale, ready to paste into your project."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colour is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a Base colour, or type a HEX code.",
   "Type a Palette name.",
   "Read the 50–950 shade scale — click any swatch to copy its HEX code.",
   "Copy the CSS variables (HEX or OKLCH) or the Tailwind config."
  ],
  "privacyTitle": "Palettes are made on your device"
 },
 "color-atlas": {
  "faq": [
   {
    "a": "No. The colour is studied only in this browser tab and is never sent to any server, including Cheakstar.",
    "q": "Is my colour uploaded?"
   },
   {
    "a": "Every format of the colour, its shade, tint and tone scales, its harmonies, its contrast partners and a CSS export — everything about one colour on one page.",
    "q": "What is on the page?"
   },
   {
    "a": "Complementary, analogous (neighbours 30 degrees apart), triadic (120 degrees), split-complementary and tetradic (90-degree steps).",
    "q": "Which harmonies are shown?"
   },
   {
    "a": "Yes. Every swatch on the page can be clicked to copy its HEX code.",
    "q": "Can I copy a single colour from a scale or harmony?"
   }
  ],
  "goodToKnow": [
   "Every swatch on the page is clickable to copy its HEX code.",
   "Five harmony types are shown, each explained in one line.",
   "The CSS export covers the base colour, its scales and its harmonies in one copy."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colour is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a colour, or type a HEX code.",
   "Read every format, plus the shade, tint and tone scales.",
   "Explore the harmonies and contrast partners — click any swatch to copy its HEX code.",
   "Click Copy CSS export to copy variables for the base colour, its scales and its harmonies."
  ],
  "privacyTitle": "Your colour stays on your device"
 },
 "color-harmony-generator": {
  "faq": [
   {
    "a": "No. Your harmonies are built only in this browser tab and are never sent to any server, including Cheakstar.",
    "q": "Is my colour uploaded?"
   },
   {
    "a": "The Lightness, Chroma and Hue sliders work in OKLCH, the perceptual colour space, so changes look even to the eye instead of bunching up.",
    "q": "Why do the sliders work in OKLCH?"
   },
   {
    "a": "It rotates the whole harmony set by the number of degrees you set, keeping the relationships between the colours.",
    "q": "What does Hue shift do?"
   },
   {
    "a": "Yes. The Reset sliders to base colour button puts every slider back to the base colour's own values.",
    "q": "Can I undo my slider changes?"
   }
  ],
  "goodToKnow": [
   "Each harmony type is explained in plain English on the page.",
   "The three sliders reshape the whole set at once, not one colour at a time.",
   "One Copy CSS variables button copies the whole set."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your colour is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Pick a Base colour, or type a HEX code.",
   "Choose a Harmony type — each type is explained in plain English.",
   "Shape the whole set at once with the Lightness, Chroma and Hue shift sliders.",
   "Copy the CSS variables for the finished set."
  ],
  "privacyTitle": "Palettes are made on your device"
 },
 "image-clipper": {
  "faq": [
   {
    "a": "No. Your file is processed on this device only — it never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "It scans the alpha channel, finds the tightest box around the actual content, and cuts away the transparent edges outside that box.",
    "q": "What exactly does it trim?"
   },
   {
    "a": "A PNG or WebP with transparency — logos, icons and stickers often carry a wide transparent margin that this tool removes.",
    "q": "Which images work best?"
   },
   {
    "a": "Padding is kept on every side, inside the original edges — so the clipped image can keep a small margin and never grows beyond the original canvas.",
    "q": "What is the padding setting?"
   }
  ],
  "goodToKnow": [
   "The report updates instantly when you change the padding after loading.",
   "The tool reports exactly what was cut, in pixels, on each side.",
   "Padding is kept inside the original edges, so the result is never larger than the original file's canvas."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image (PNG or WebP with transparency works best), or drop it here.",
   "Set Padding to keep (px) if you want a margin kept around the content.",
   "Read the exact report of what was cut.",
   "Download the clipped image."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "metadata-stripper": {
  "faq": [
   {
    "a": "No. Your file is processed on this device only — it never leaves this browser tab.",
    "q": "Is my file uploaded?"
   },
   {
    "a": "Camera or phone model, when a picture was taken, the software that made the file, and sometimes the GPS location — in the file it shows you EXIF, GPS, XMP, text chunks and the ICC colour profile.",
    "q": "What metadata can it find and remove?"
   },
   {
    "a": "Images are cleaned by re-encoding the pixels through the browser canvas, which cannot re-attach an ICC colour profile — so the tool honestly offers no “keep ICC” switch, and wide-gamut photos may shift very slightly.",
    "q": "Why might colours shift very slightly after cleaning?"
   },
   {
    "a": "PDFs are cleaned with the pdf-lib library, rebuilt without their metadata.",
    "q": "How are PDFs cleaned?"
   }
  ],
  "goodToKnow": [
   "You see exactly what the file says about you before anything is stripped.",
   "The same tool handles both images and PDFs.",
   "There is deliberately no “keep ICC” switch — a browser canvas cannot re-attach a colour profile, so the tool does not pretend otherwise."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your file is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image (JPEG, PNG or WebP) or a PDF, or drop it here.",
   "Read the metadata the tool finds in your file.",
   "Click Strip metadata and prepare download.",
   "Download the clean copy."
  ],
  "privacyTitle": "Your files never leave your browser"
 },
 "paste-image": {
  "faq": [
   {
    "a": "No. The image is handled on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "The button needs your browser's permission; if it is unavailable, Ctrl+V (or Cmd+V) anywhere on the page always works.",
    "q": "The Paste from clipboard button does not work — what else can I do?"
   },
   {
    "a": "Free, 1:1, 4:3, 3:2, 16:9 and 9:16 — or use Select whole image to keep everything.",
    "q": "Which aspect ratios can I lock?"
   },
   {
    "a": "Your clipboard — a screenshot you just took or an image you copied in another app. It never has to exist as a file first.",
    "q": "Where does the pasted image come from?"
   }
  ],
  "goodToKnow": [
   "Screenshots and copied images live on your clipboard, not in a file — this tool works straight from the clipboard.",
   "The crop size and offset are shown live as you adjust.",
   "No upload and no sign-up at any point."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Press Ctrl+V (or Cmd+V) anywhere on the page to paste — or use Paste from clipboard, or Choose a file instead.",
   "Adjust the crop with Offset X, Offset Y, Crop width and Crop height, or lock an aspect ratio.",
   "Choose a Download format — PNG, JPEG or WebP.",
   "Download the cropped image."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "placeholder-generator": {
  "faq": [
   {
    "a": "No. Everything is generated on this device; nothing is uploaded.",
    "q": "Is anything uploaded?"
   },
   {
    "a": "Any width and height you type — or use the presets: Full HD, YouTube thumbnail, Open Graph, Instagram post, Story/Reel, Facebook cover and common ad slots.",
    "q": "What sizes can I make?"
   },
   {
    "a": "The placeholder shows its own size (for example 800×600) as the label text.",
    "q": "What happens if I leave the label empty?"
   },
   {
    "a": "PNG, JPEG, WebP or SVG.",
    "q": "Which formats can I download?"
   }
  ],
  "goodToKnow": [
   "The stats update live, including the exact size of the file you will download.",
   "Presets cover social sizes and ad slots, from a 320×50 mobile banner to a 1920×1080 Full HD frame.",
   "SVG output keeps the placeholder crisp at any display size."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — the placeholder is generated on this device and nothing is uploaded to any server, including Cheakstar.",
  "steps": [
   "Set the Width (px) and Height (px), or pick a Size preset.",
   "Pick the Background colour and Text colour, and type a Label text (leave empty to show the size).",
   "Choose a Format.",
   "Download the placeholder image."
  ],
  "privacyTitle": "Generated on your device only"
 },
 "artwork-enhancer": {
  "faq": [
   {
    "a": "No. Your image is processed on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "It lays a layer of random colour noise over the artwork in overlay blend mode: every pixel gets a tiny random push toward a different colour, so flat areas gain the subtle texture of paper, canvas or film grain.",
    "q": "What does the grain actually do?"
   },
   {
    "a": "The classic recipe is just 2% opacity — enough to feel, not enough to see. Noise scale 1 is fine film grain; higher values are chunkier, more painterly blocks.",
    "q": "What settings should I start with?"
   },
   {
    "a": "Yes. The New grain button re-rolls the noise, so the same settings give a fresh random pattern.",
    "q": "Can I try a different grain?"
   }
  ],
  "goodToKnow": [
   "Perfectly flat digital colour can look sterile; the grain makes it feel organic.",
   "Opacity is how strong the grain is; scale is the size of each noise block.",
   "The same trick digital painters use, with the classic 2% recipe as the starting point."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an artwork image, or drop it here.",
   "Set Noise opacity (2% is the classic subtle recipe) and Noise scale.",
   "Compare Before and After — with grain.",
   "Download the enhanced image."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "image-splitter": {
  "faq": [
   {
    "a": "No. Your image is processed on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "Tiles are cut at the largest equal size that fits. The leftover strip is shown honestly in the report and shaded on the preview — it is not included in any tile, and nothing is silently stretched.",
    "q": "What if my image does not divide exactly?"
   },
   {
    "a": "Columns and rows each go from 1 to 20.",
    "q": "How big can the grid be?"
   },
   {
    "a": "Instagram carousels, puzzle posts and print layouts — anywhere one picture needs to become a grid of equal tiles.",
    "q": "What is it for?"
   }
  ],
  "goodToKnow": [
   "The gold lines on the preview are the cuts; a shaded strip on the right or bottom edge is the trimmed remainder.",
   "Tiles are always equal-sized — the tool never stretches a tile to force a fit.",
   "The ZIP download gathers every tile in one file."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image, or drop it here.",
   "Set Columns (1–20) and Rows (1–20).",
   "Check the gold cut lines and the report before downloading.",
   "Download the tiles one by one, or Download all tiles as ZIP."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "image-masker": {
  "faq": [
   {
    "a": "No. Your image is processed on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "None (full frame), circle, rounded rectangle, squircle, triangle, hexagon, star and heart — or your own custom SVG shape.",
    "q": "Which shapes can I use?"
   },
   {
    "a": "Upload an SVG file or paste SVG markup; the first path is used (a rect, circle, ellipse or polygon also works), and holes and multi-part paths follow the SVG fill rule of the path itself.",
    "q": "How does a custom SVG shape work?"
   },
   {
    "a": "A transparent PNG. The chequerboard in the preview is transparency — it is not part of the download.",
    "q": "What do I download?"
   }
  ],
  "goodToKnow": [
   "Everything outside the shape becomes transparent — ready for profile pictures, stickers and design work.",
   "The Shape parameter and Zoom controls fine-tune the mask before you position the image.",
   "Custom shapes can come from an SVG file or from pasted markup."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image, or drop it here.",
   "Pick a shape, or load your own SVG shape.",
   "Zoom and drag the image until it sits exactly where you want it inside the shape.",
   "Download the transparent PNG."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "image-de-skewer": {
  "faq": [
   {
    "a": "No. The warp runs on this device only — your image never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "For speed, the straightened output is capped at 2000 px on its longest side. The corner editor always shows the full photo.",
    "q": "Is the output full resolution?"
   },
   {
    "a": "Anything flat photographed at an angle — a document, a whiteboard or a screen.",
    "q": "What can I straighten?"
   },
   {
    "a": "Drag each gold handle (TL, TR, BR, BL) onto the matching corner of the flat thing in the picture; the gold outline is the region that will be straightened.",
    "q": "How do I line up the corners?"
   }
  ],
  "goodToKnow": [
   "The corner editor always shows the full photo, even though the output is capped at 2000 px for speed.",
   "Reset corners puts all four handles back if a drag goes wrong.",
   "The output shape presets match common document and screen proportions."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image, or drop it here.",
   "Drag the four gold corner handles onto the real corners of the document or board.",
   "Choose the Output shape (aspect).",
   "Click Straighten and download the flat rectangle."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "image-tracer": {
  "faq": [
   {
    "a": "No. Your image is processed on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "Use fewer colours and a higher minimum path size. More colours keep photo detail at the cost of a bigger file.",
    "q": "How do I get a simpler, bolder result?"
   },
   {
    "a": "For speed, the image is traced at up to 800 px on its longest side. The Scale control sets the SVG's output size independently.",
    "q": "What size is the image traced at?"
   },
   {
    "a": "Logos, drawings and icons — flat shapes with clear edges trace into the cleanest vectors.",
    "q": "Which images trace best?"
   }
  ],
  "goodToKnow": [
   "Fewer colours and a higher minimum path size give a simpler, bolder vector.",
   "The trace size (up to 800 px) and the output size are separate — a small trace can still export a large SVG.",
   "Presets give a sensible starting point for logos, drawings and photos."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image, or drop it here.",
   "Pick a Preset, and set Colours, Smoothing and Minimum path size.",
   "Click Trace image.",
   "Set the Output scale, then copy the SVG markup or download the SVG."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "svg-optimiser": {
  "faq": [
   {
    "a": "No. Everything runs on this device — your SVG is never uploaded to any server, including Cheakstar.",
    "q": "Is my SVG uploaded?"
   },
   {
    "a": "Yes. This is a safe, conservative optimiser: it never touches shapes, colours or referenced ids, and it re-parses its own output to prove the SVG still works before offering it to you.",
    "q": "Is the optimisation safe?"
   },
   {
    "a": "Editor junk — comments, editor metadata and namespaces (Inkscape, Illustrator, Sketch, Affinity) — empty groups and empty definitions, and id attributes that nothing in the file references, according to the boxes you tick.",
    "q": "What gets removed?"
   },
   {
    "a": "Only when a viewBox is present, so the SVG still scales — and only if you tick that option.",
    "q": "When is the root width/height removed?"
   }
  ],
  "goodToKnow": [
   "Long decimal numbers are rounded to the precision you choose — often the biggest saving in editor-exported files.",
   "Only removals that cannot affect the picture are offered.",
   "The result is re-checked before it is shown to you."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your SVG is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an SVG file, drop it here, or paste SVG markup.",
   "Tick what to remove, and set Number precision (decimal places).",
   "Click Optimise SVG.",
   "Copy the optimised SVG, or download it."
  ],
  "privacyTitle": "Your SVG never leaves this device"
 },
 "image-watermark": {
  "faq": [
   {
    "a": "No. Your image is processed on this device only and never leaves this browser tab.",
    "q": "Is my image uploaded?"
   },
   {
    "a": "Yes. Choose the Logo tab and add a logo image — a PNG with transparency works best — and set its width and opacity.",
    "q": "Can I use my own logo instead of text?"
   },
   {
    "a": "Yes. The Repeat option tiles the watermark across the whole picture instead of placing it once.",
    "q": "Can the watermark repeat?"
   },
   {
    "a": "In any of nine positions — the corners, the edges or the centre — using the position grid.",
    "q": "Where can I place it?"
   }
  ],
  "goodToKnow": [
   "The preview updates live as you change size, opacity and position.",
   "Text size is set as a percentage of the image width, so it scales sensibly on any photo.",
   "Text and logo watermarks have their own opacity settings."
  ],
  "privacyKind": "local",
  "privacyNote": "Runs entirely in your browser — your image is processed on this device and is never uploaded to any server, including Cheakstar.",
  "steps": [
   "Choose an image, or drop it here.",
   "Choose Text or Logo, and set the text or logo, its size and opacity.",
   "Pick a Position, and set Repeat if you want it tiled.",
   "Choose a Download format and download the watermarked image."
  ],
  "privacyTitle": "Your image never leaves this device"
 },
 "audio-trimmer": {
  "faq": [
   {
    "a": "No. Everything is decoded and trimmed on this device only — your file never leaves this browser tab.",
    "q": "Is my audio file uploaded?"
   },
   {
    "a": "Drag the edges of the gold selection on the waveform to fine-tune, drag the middle to move it — or type the Start and End seconds directly.",
    "q": "How do I fine-tune the selection?"
 }
};
window.CK_TOOL_RELATED = {
 "color-picker-from-image": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  }
 ],
 "favicon-generator": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  }
 ],
 "file-hash-checker": [
  {
   "slug": "zip-extractor",
   "name": "ZIP Extractor",
   "description": "Open a ZIP file in your browser and download the files inside it."
  },
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "photo-privacy-checker",
   "name": "Photo Privacy Checker (EXIF)",
   "description": "See what a photo secretly carries: GPS location, camera model and date taken."
  }
 ],
 "image-compressor": [
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
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  },
  {
   "slug": "passport-photo-maker",
   "name": "Passport Photo Maker",
   "description": "Crop a photo to 35 x 45 mm and download it, plus a 4 x 6 inch sheet of 8 copies."
  }
 ],
 "image-converter": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
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
  }
 ],
 "image-information": [
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
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
  }
 ],
 "image-resizer-cropper": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "passport-photo-maker",
   "name": "Passport Photo Maker",
   "description": "Crop a photo to 35 x 45 mm and download it, plus a 4 x 6 inch sheet of 8 copies."
  }
 ],
 "images-to-pdf": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "passport-photo-maker": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  }
 ],
 "pdf-compressor": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  }
 ],
 "pdf-merge": [
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "pdf-split": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "pdf-to-images": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "pdf-to-text": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  }
 ],
 "resize-image-to-kb": [
  {
   "slug": "image-information",
   "name": "Image Information",
   "description": "See an image's size, dimensions and the camera details (EXIF) stored inside it."
  },
  {
   "slug": "image-compressor",
   "name": "Image Compressor",
   "description": "Shrink a JPG, PNG or WebP image to a smaller file size."
  },
  {
   "slug": "image-converter",
   "name": "Image Converter",
   "description": "Convert an image between JPG, PNG and WebP."
  },
  {
   "slug": "image-resizer-cropper",
   "name": "Image Resizer & Cropper",
   "description": "Resize an image to exact pixels, or crop it to an aspect ratio, with passport presets."
  }
 ],
 "rotate-pdf": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  }
 ],
 "text-to-pdf": [
  {
   "slug": "pdf-merge",
   "name": "PDF Merge",
   "description": "Combine several PDFs into one PDF, in your chosen order."
  },
  {
   "slug": "pdf-split",
   "name": "PDF Split",
   "description": "Extract chosen pages from a PDF, or delete pages from it."
  },
  {
   "slug": "images-to-pdf",
   "name": "Images to PDF",
   "description": "Turn JPG or PNG images into a single PDF, one image per page."
  },
  {
   "slug": "pdf-to-images",
   "name": "PDF to Images",
   "description": "Render every page of a PDF as a JPG or PNG image."
  }
 ],
 "zip-extractor": [
  {
   "slug": "file-hash-checker",
   "name": "File Hash Checker",
   "description": "Get the SHA-256 and MD5 hash of any file, for verifying downloads."
  },
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
  },
  {
   "slug": "pdf-compressor",
   "name": "PDF Compressor",
   "description": "Make a PDF smaller by re-rendering its pages as compressed images."
  }
 ],
 "audio-converter": [
  {
   "slug": "media-info",
   "name": "Media Info",
   "description": "See a media file's duration, resolution, codecs, bitrate and more."
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
  },
  {
   "slug": "gif-maker",
   "name": "GIF Maker",
   "description": "Turn the first seconds of a video into an animated GIF."
  }
 ],
 "audio-merger": [
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
 "base64-encoder-decoder": [
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
   "slug": "json-formatter",
   "name": "JSON Formatter & Validator",
   "description": "Pretty-print JSON and pinpoint the error when it is invalid."
  }
 ],
 "case-converter": [
  {
   "slug": "word-counter",
   "name": "Word & Character Counter",
   "description": "Count words, characters, sentences and reading time as you type."
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
 "csv-json-converter": [
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
 "extract-audio": [
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
   "slug": "video-trimmer",
   "name": "Video Trimmer",
   "description": "Cut a section out of a short video clip."
  },
  {
   "slug": "gif-maker",
   "name": "GIF Maker",
   "description": "Turn the first seconds of a video into an animated GIF."
  }
 ],
 "gif-maker": [
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
 "json-formatter": [
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
 "media-info": [
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
  },
  {
   "slug": "gif-maker",
   "name": "GIF Maker",
   "description": "Turn the first seconds of a video into an animated GIF."
  }
 ],
 "screen-recorder": [
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
 "text-diff-checker": [
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
 "video-trimmer": [
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
   "slug": "gif-maker",
   "name": "GIF Maker",
   "description": "Turn the first seconds of a video into an animated GIF."
  }
 ]
};

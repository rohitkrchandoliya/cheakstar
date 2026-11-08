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

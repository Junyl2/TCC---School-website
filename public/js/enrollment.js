//upload key
UPLOADCARE_PUBLIC_KEY = "12ba6da6dda727647f81";


//initialized aot
AOS.init({ duration: 800, once: true });

// Replace function to reset the uploader
function resetUploader(name) {
    const input = document.querySelector(`[name="${name.replace(/-/g, ' ')}"]`);
    const preview = document.getElementById(`preview-${name}`);
    if (input && preview) {
        const widget = uploadcare.Widget(input);
        widget.value(null); // clear
        preview.innerHTML = '';
    }
}

// Filtering
const filters = {
    type: 'all',
    course: 'all',
    year: 'all',
};

const updateFilter = () => {
    const cards = document.querySelectorAll('.program-card-wrap');
    cards.forEach((card) => {
        const type = card.dataset.type;
        const course = card.dataset.course;
        const year = card.dataset.year;

        const matchType =
            filters.type === 'all' || type.includes(filters.type);
        const matchCourse =
            filters.course === 'all' || course === filters.course;
        const matchYear =
            filters.year === 'all' || year.includes(filters.year);

        card.style.display =
            matchType && matchCourse && matchYear ? 'block' : 'none';
    });
};

document.getElementById('filterType').addEventListener('change', (e) => {
    filters.type = e.target.value;
    updateFilter();
});

document
    .getElementById('filterCourse')
    .addEventListener('change', (e) => {
        filters.course = e.target.value;
        updateFilter();
    });

document.getElementById('filterYear').addEventListener('change', (e) => {
    filters.year = e.target.value;
    updateFilter();
});

//programs
const programs = ["beed", "bsed", "bsintech", "bshm", "bshrtm", "dpe"];

programs.forEach((program) => {
    const studentType = document.getElementById(`studentType-${program}`);
    const yearLevel = document.getElementById(`yearLevel-${program}`);

    const uploadGrade = document.getElementById(`upload-grade-${program}`);
    const uploadClearance = document.getElementById(`upload-clearance-${program}`);
    const uploadTOR = document.getElementById(`upload-tor-${program}`);
    const uploadGoodMoral = document.getElementById(`upload-goodmoral-${program}`);

    if (!studentType || !yearLevel) return;

    function updateUploads() {
        const type = studentType.value;
        const year = yearLevel.value;

        // Reset visibility
        uploadGrade?.classList.add("d-none");
        uploadClearance?.classList.add("d-none");
        uploadTOR?.classList.add("d-none");
        uploadGoodMoral?.classList.add("d-none");

        // Continuing - show grade slip & clearance (except 1st year)
        if (
            type === "continuing" &&
            (year === "2nd Year" || year === "3rd Year" || year === "4th Year")
        ) {
            uploadGrade?.classList.remove("d-none");
            uploadClearance?.classList.remove("d-none");
        }

        // Transferee - always needs TOR
        if (type === "transferee") {
            uploadTOR?.classList.remove("d-none");

            // Needs Good Moral for all year levels
            if (
                year === "1st Year" ||
                year === "2nd Year" ||
                year === "3rd Year" ||
                year === "4th Year"
            ) {
                uploadGoodMoral?.classList.remove("d-none");
            }
        }

        // New + 1st Year = Needs Good Moral
        if (type === "new" && year === "1st Year") {
            uploadGoodMoral?.classList.remove("d-none");
        }
    }

    studentType.addEventListener("change", updateUploads);
    yearLevel.addEventListener("change", updateUploads);
});

//file size, replace file and remove file
/* const MAX_SIZE_MB = 5; */
document.addEventListener("DOMContentLoaded", function () {
    const MAX_SIZE_MB = 5;

    const inputs = document.querySelectorAll('[role="uploadcare-uploader"]');

    inputs.forEach((input) => {
        const inputName = input.getAttribute("name");
        const safeName = inputName.replace(/\s+/g, "-").toLowerCase();
        const previewId = `preview-${safeName}`;

        // Create preview container
        const wrapper = document.createElement("div");
        wrapper.id = previewId;
        wrapper.className = "upload-preview mt-2 mb-3";
        input.parentNode.appendChild(wrapper);

        const widget = uploadcare.Widget(input);

        widget.onUploadComplete((fileInfo) => {
            const fileSizeMB = fileInfo.size / (1024 * 1024);

            if (fileSizeMB > MAX_SIZE_MB) {
                alert(`❌ File "${fileInfo.name}" is too large (${fileSizeMB.toFixed(2)} MB). Max allowed: ${MAX_SIZE_MB} MB`);
                widget.value(null); // clear input
                wrapper.innerHTML = ''; // clear preview
                return;
            }

            // Display preview
            const url = fileInfo.cdnUrl;
            const isImage = fileInfo.isImage;
            const fileName = fileInfo.name;

            let previewHTML = "";

            if (isImage) {
                previewHTML += `
            <img src="${url}" alt="${fileName}" style="max-width: 150px; border-radius: 6px;" class="d-block mb-2" />
          `;
            } else {
                previewHTML += `
            <a href="${url}" target="_blank" class="btn btn-sm btn-outline-primary mb-2">
              📄 View ${fileName}
            </a><br>
          `;
            }

            previewHTML += `
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-warning" onclick="replaceUploader('${safeName}')">
              🔁 Replace File
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeUploader('${safeName}')">
              ❌ Remove File
            </button>
          </div>
        `;

            wrapper.innerHTML = previewHTML;
        });
    });
});

function replaceUploader(name) {
    const input = findInputBySafeName(name);
    if (input) {
        uploadcare.Widget(input).openDialog();
    }
}

function removeUploader(name) {
    const input = findInputBySafeName(name);
    const preview = document.getElementById(`preview-${name}`);
    if (input && preview) {
        uploadcare.Widget(input).value(null);
        preview.innerHTML = '';
    }
}

function findInputBySafeName(name) {
    const safeToOriginal = name.replace(/-/g, ' ');
    return [...document.querySelectorAll('[role="uploadcare-uploader"]')].find(
        (el) => el.name.toLowerCase() === safeToOriginal
    );
}
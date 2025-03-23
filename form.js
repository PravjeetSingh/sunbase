const form = document.getElementById("form");
const addInputButton = document.getElementById("add-text-input");
const addSelectButton = document.getElementById("add-select");
const addTextareaButton = document.getElementById("add-textarea");
const saveButton = document.getElementById("save-button");
const darkModeToggle = document.getElementById("toggle-theme");

let formElements = [];
let currentEditingElement = null;


// Predefined Sample JSON Data
let jsonData = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Input",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Select",
        "options": ["Sample Option 1", "Sample Option 2", "Sample Option 3"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "textarea",
        "label": "Sample Textarea",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "checkbox",
        "label": "Sample Checkbox"
    }
];

function renderForm() {
    form.innerHTML = "";
    jsonData.forEach((element) => {
        let field = document.createElement("div");
        field.classList.add("form-element");
        field.setAttribute("draggable", "true");
        field.innerHTML = `<label>${element.label}</label>`;

        if (element.type === "input") {
            field.innerHTML += `<input type="text" placeholder="${element.placeholder}" />`;
        } else if (element.type === "select") {
            let select = `<select>`;
            element.options.forEach(option => {
                select += `<option>${option}</option>`;
            });
            select += `</select>`;
            field.innerHTML += select;
        } else if (element.type === "textarea") {
            field.innerHTML += `<textarea placeholder="${element.placeholder}"></textarea>`;
        } else if (element.type === "checkbox") {
            field.innerHTML += `<input type="checkbox">`;
        }

        // Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa fa-edit"></i>';
        editButton.classList.add("edit-button");
        editButton.onclick = (e) => {
            e.preventDefault();
            openEditModal(element);
        };
        // Edit Modal Functionality
let currentEditingElement = null;
const editModal = document.getElementById("edit-modal");
const editLabelInput = document.getElementById("edit-label");
const editPlaceholderInput = document.getElementById("edit-placeholder");
const editOptionsInput = document.getElementById("edit-options");
const cancelEditButton = document.getElementById("cancel-edit");
const saveEditButton = document.getElementById("save-edit");


function openEditModal(element) {
currentEditingElement = element;
editLabelInput.value = element.label;

if (element.type === 'input' || element.type === 'textarea') {
    editPlaceholderInput.classList.remove('model-hidden');
    editOptionsInput.classList.add('model-hidden');
    editPlaceholderInput.value = element.placeholder;
} else if (element.type === 'select') {
    editPlaceholderInput.classList.add('model-hidden');
    editOptionsInput.classList.remove('model-hidden');
    editOptionsInput.value = element.options.join(',');
}

editModal.classList.remove('model-hidden');
}

cancelEditButton.onclick = () => {
editModal.classList.add('model-hidden');
};

saveEditButton.onclick = () => {
if (currentEditingElement) {
    currentEditingElement.label = editLabelInput.value;

    if (currentEditingElement.type === 'input' || currentEditingElement.type === 'textarea') {
        currentEditingElement.placeholder = editPlaceholderInput.value;
    } else if (currentEditingElement.type === 'select') {
        currentEditingElement.options = editOptionsInput.value.split(',');
    }

    showToast('Element updated successfully!');
    editModal.classList.add('model-hidden');
    renderForm();
}
};

function showToast(message) {
const toast = document.createElement("div");
toast.classList.add("toast");
toast.innerText = message;

document.body.appendChild(toast);

setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
        toast.remove();
    }, 500);
}, 2000);
}






        // Remove button
        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="fa fa-trash" style="color: black; background: transparent;"></i>';
        removeButton.classList.add("remove");
        removeButton.onclick = () => {
            jsonData = jsonData.filter(el => el.id !== element.id);
            renderForm();
        };

        field.appendChild(editButton);
        field.appendChild(removeButton);
        form.appendChild(field);
    });

    addDragAndDrop();
}

function addDragAndDrop() {
    const elements = document.querySelectorAll(".form-element");
    elements.forEach(element => {
        element.addEventListener("dragstart", () => {
            element.classList.add("dragging");
        });
        element.addEventListener("dragend", () => {
            element.classList.remove("dragging");
        });
    });

    form.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggingElement = document.querySelector(".dragging");
        const siblings = [...form.querySelectorAll(".form-element:not(.dragging)")];
        const nextSibling = siblings.find(sibling => e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);
        form.insertBefore(draggingElement, nextSibling);
    });
}

// Edit modal functionality
const editModal = document.getElementById('edit-modal');
const editLabelInput = document.getElementById('edit-label');
const editPlaceholderInput = document.getElementById('edit-placeholder');
const editOptionsInput = document.getElementById('edit-options');
const cancelEditButton = document.getElementById('cancel-edit');
const saveEditButton = document.getElementById('save-edit');




function openEditModal(element) {
    currentEditingElement = element;
    editLabelInput.value = element.label;

    if (element.type === "input" || element.type === "textarea") {
        editPlaceholderInput.classList.remove("hidden");
        editOptionsInput.classList.add("hidden");
        editPlaceholderInput.value = element.placeholder;
    } else if (element.type === "select") {
        editPlaceholderInput.classList.add("hidden");
        editOptionsInput.classList.remove("hidden");
        editOptionsInput.value = element.options.join(",");
    }

    editModal.classList.remove("hidden");
}

cancelEditButton.onclick = () => {
    editModal.classList.add("hidden");
};

saveEditButton.onclick = () => {
    if (currentEditingElement) {
        currentEditingElement.label = editLabelInput.value;

        if (currentEditingElement.type === "input" || currentEditingElement.type === "textarea") {
            currentEditingElement.placeholder = editPlaceholderInput.value;
        } else if (currentEditingElement.type === "select") {
            currentEditingElement.options = editOptionsInput.value.split(",");
        }

        alert("Element updated successfully!");
        editModal.classList.add("hidden");
        renderForm();
    }
};

function addElement(type) {
    let label = prompt("Enter label:");
    if (!label) return;

    if (type === "input" || type === "textarea") {
        let placeholder = prompt("Enter placeholder:");
        jsonData.push({ id: crypto.randomUUID(), type, label, placeholder });
    } else if (type === "select") {
        let options = prompt("Enter options (comma-separated):").split(",");
        jsonData.push({ id: crypto.randomUUID(), type, label, options });
    }
    renderForm();
}

addInputButton.addEventListener("click", () => addElement("input"));
addSelectButton.addEventListener("click", () => addElement("select"));
addTextareaButton.addEventListener("click", () => addElement("textarea"));

saveButton.addEventListener("click", () => {
    console.log(JSON.stringify(jsonData, null, 2));
    alert("Form saved to console!");
});


// Dark Mode
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

renderForm(); // Render the initial form with sample data

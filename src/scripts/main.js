/**
 * @name CloneFormFields
 * @desc CloneFormFields class to clone field groups with an option to remove cloned groups.
 * @author Sami El-Younsi
 * @version 1.0.0
 * 
 * @param {string} selector - The CSS selector for the fields to be cloned.
 * @param {object} options - Configuration options to customize button texts.
 * 
 */
class CloneFormFields 
{
    constructor(selector, options) 
    {
        this.fields = document.querySelectorAll(selector);
        this.addButtonElement = null;

        this.options = {
            buttonText: "Hinzufügen",
            buttonRemoveText: "Feldgruppe löschen"
        }
        this.settings   = this.merge(this.options, options);
        this.addButton();
    }

    /**
     * ADD BUTTON TO CLONE FIELDS
     */
    addButton()
    {
        let lastField = this.fields[this.fields.length - 1];

        this.addButtonElement = this.createElement({tag: "span", className: "btn btn-blue-text", innerText: this.settings.buttonText, role: "button", tabIndex: 0}, lastField, "afterend");
        this.addButtonElement.addEventListener("click", () => this.cloneFields())
        this.addButtonElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });
    }

    /**
     * CLONE FIELDS ON CLICK
     */
    cloneFields() 
    {
        let clonedContainerNumber = document.querySelectorAll('[class*="cloned-fields-"]').length + 1;
        let clonedContainer = this.createElement({
            tag: 'div',
            className: `cloned-fields-${clonedContainerNumber}`
        }, this.addButtonElement, 'beforebegin');

        this.fields.forEach((field) => {
            let newField;

            if (field.tagName.toLowerCase() === 'label') {
                newField = field.cloneNode(true);
                if (newField.htmlFor) {
                    newField.htmlFor += `_${clonedContainerNumber}`;
                }
            } else {
                newField = field.cloneNode(true);
                if (newField.id) {
                    newField.id = newField.id.replace(/_[0-9]+$/, '') + `_${clonedContainerNumber}`;
                    newField.value = "";
                }
            }

            clonedContainer.appendChild(newField);
        });

        let deleteButton = this.createElement({
            tag: 'span',
            role: 'button',
            tabIndex: 0,
            className: 'btn delete-btn',
            innerText: this.settings.buttonRemoveText
        }, clonedContainer, 'beforeend');

        deleteButton.addEventListener('click', () => {
            clonedContainer.remove();
            this.reorderContainers();
        });

        deleteButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });

        const firstInputField = clonedContainer.querySelector('input:not([type="hidden"]), select, textarea');
        if (firstInputField) {
            firstInputField.focus();
        }
    }

    /**
     * REORDER CONTAINERS
     */
    reorderContainers() 
    {
        let containers = document.querySelectorAll('[class*="cloned-fields-"]');
        
        containers.forEach((container, index) => 
        {
            let containerNumber = index + 1; 

            container.className = `cloned-fields-${containerNumber}`;
            container.querySelectorAll('label').forEach(label => {
                if (label.htmlFor) {
                    label.htmlFor = label.htmlFor.replace(/_[0-9]+$/, '') + `_${containerNumber}`;
                }
            });

            container.querySelectorAll('[id]').forEach(input => {
                input.id = input.id.replace(/_[0-9]+$/, '') + `_${containerNumber}`;
            });
        });

        this.addButtonElement.focus();
    }

    /**
     * @name createElement
     * 
     * @param {object} child 
     * @param {dom} parent 
     * @param {bool} before 
     * @returns Create and returns Child Element
     */
    createElement(child, parent, position = 'beforeend') 
    {
        let ele = document.createElement(child["tag"]);
        let dataset = child?.dataset ? child.dataset : false;

        delete child["tag"];
        delete child["dataset"];

        for(let type in child) {
            ele[type] = child[type];
        }

        if(dataset) {
            for(let type in dataset) {
                ele.dataset[type] = dataset[type];
            }  
        }

        parent.insertAdjacentElement(position, ele)
        return ele;
    }

    /**
     * @name merge
     * 
     * @param  {...any} objects 
     * @returns Merged Object
     */
    merge(...objects) {
        // create a new object
        let target = {}
      
        // deep merge the object into the target object
        const merger = obj => {
          for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                // if the property is a nested object
                target[prop] = this.merge(target[prop], obj[prop])
              } else {
                // for regular property
                target[prop] = obj[prop]
              }
            }
          }
        }
      
        // iterate through all objects and
        // deep merge them with target
        for (let i = 0; i < objects.length; i++) {
          merger(objects[i])
        }
        return target
    }
}
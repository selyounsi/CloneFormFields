# CloneFormFields

## Description

The `CloneFormFields` class allows you to clone groups of form fields
and remove these groups as needed. This feature is excellent for forms
where users may want to add multiple input fields.

## Installation

To use the class in your project, make sure you include the file
`/dist/scripts/main.min.js`.

## Usage

First, you need to create an HTML element that contains the fields you
want to clone. Don't forget to add the `clone-field` class to both
labels and inputs.

``` html
<div>
    <label class="clone-field" for="input1">Field 1</label>
    <input class="clone-field" type="text" id="input1" name="input1">
</div>
```

### Initialization

You can instantiate the CloneFormFields class as follows:

``` javascript
const cloneFormFields = new CloneFormFields('.clone-field', {
    buttonText: "Add field",
    buttonRemoveText: "Delete field group"
});
```

### Configuration

-   **buttonText**: The button text for adding new fields. Default is
    **"Add"**.
-   **buttonRemoveText**: The button text for removing a field group.
    Default is **"Delete field group"**.

## How It Works

-   **Add field**: When the user clicks the "Add field" button, a new
    group of form fields is created, containing a copy of the existing
    fields.
-   **Delete field group**: Each cloned field contains a "Delete field
    group" button, which removes the respective group.
-   **Automatic numbering**: The IDs and `for` attributes of the labels
    are automatically updated to avoid collisions.

## Example

Here is a simple example showing how the class can be used:

``` html
<form class="cms-contact-form default">
    <label class="clone-field" for="field1">Field 1</label>
    <input class="clone-field" type="text" id="field1" />
</form>

<script>
    const cloneFormFields = new CloneFormFields('.clone-field');
</script>
```

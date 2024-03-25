export default function Option({ option }) {

    function firstLetterUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <option value={option}>{firstLetterUpperCase(option)}</option>
    )
}
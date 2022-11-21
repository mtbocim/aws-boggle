/** Presentation component for a button
 *
 *  Props:
 *  - click
 *    - function to call in parent
 *  - label
 *    - text inside of button
 *
 *  Stateless
 *
 *  { Madlib, MadlibForm } -> Button
 */

function Button({ click, label, type }) {
  return (
    <button
        className={`Button ${type}`}
        onClick={click}>
      {label}
    </button>
  );
}

export default Button

import "./Button.css"

export function Button({type, name, children, className="primary", onClick = () => {}}) {
  return (<button 
    type={type} 
    aria-label={name}
    class="name"
    onClick={onClick}
    className={className}
    name={name}>
        {children}
    </button>);
}
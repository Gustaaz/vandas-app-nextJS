interface MessageProps {
  tipo: string;
  texto: string;
  fields?: string;
}
export interface Alert {
  tipo: string;
  texto: string;
  fields?: string;
}

export const Message: React.FC<MessageProps> = ({ texto, tipo, fields }) => {
  return (
    <article className={`message is-${tipo}`}>
      <div className="message-body">
        {fields && `${fields}: `}
        {texto}
      </div>
    </article>
  );
};

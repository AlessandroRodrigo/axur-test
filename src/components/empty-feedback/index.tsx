import "./empty-feedback.css";

type EmptyFeedbackProps = {
  message: string;
};

export function EmptyFeedback({ message }: EmptyFeedbackProps) {
  return (
    <div className="empty-feedback">
      <img
        className="empty-requisition-list-feedback__icon"
        src="https://img.icons8.com/FFFFFF/empty-box"
      />

      <span className="empty-feedback__text">{message}</span>

      <a
        target="_blank"
        href="https://icons8.com/icon/1844/empty-box"
        rel="noreferrer"
        className="empty-feedback__icon__referal"
      >
        Empty Box icon by Icons8
      </a>
    </div>
  );
}

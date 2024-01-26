import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ formBtn, name, action }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? action : name}
    </button>
  );
};
export default SubmitBtn;

import styles from "./ConfirmModal.module.css";


function ConfirmModal({
  show,
  title,
  message,
  onConfirm,
  onCancel
}) {


  if (!show) return null;



  return (

    <div className={styles.overlay}>


      <div className={styles.modal}>


        <h2>
          {title}
        </h2>



        <p>
          {message}
        </p>




        <div className={styles.buttons}>


          <button

            className={styles.cancelBtn}

            onClick={onCancel}

          >
            Cancel
          </button>





          <button

            className={styles.deleteBtn}

            onClick={onConfirm}

          >
            Delete
          </button>



        </div>



      </div>


    </div>

  );

}


export default ConfirmModal;
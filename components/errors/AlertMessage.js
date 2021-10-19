import classNames from 'classnames';

export const AlertMessage = ({type, message, class_names}) => {

    if (typeof type === "number") {
        let status = parseInt(type);
        if (status >= 200 && status < 300) {
            type = "success";
        } else {
            type = "danger";
        }
    }

    let classes = classNames('alert custom-alert-danger', `alert-${type}`, class_names);

    return (
        <div className={classes} role="alert">
            {message}
        </div>
    )
}

import React , {Fragment, useState, useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import {register, clearErrors} from "../../actions/userActions"
import {useNavigate} from "react-router-dom"
import { Loader } from '../layout/Loader';

export const Register = () => {
    const [user, setUser]= useState({
        nombre: "",
        email: "",
        password: "",
    })
    const navigate=useNavigate();
    const {nombre, email, password} = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview]= useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg")
    const alert= useAlert();
    const dispatch= useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error, alert])

    const submitHandler = (e) =>{
        e.preventDefault();

        const formData= new FormData();
        formData.set("nombre", nombre);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar)

        dispatch(register(formData))
    }

    const onChange = e =>{
        if (e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload=()=>{
                if (reader.readyState ===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({ ...user, [e.target.name]: e.target.value})
        }
    }

  return (
    <Fragment>
        {loading ? <Loader/> : (
    <Fragment>
            <MetaData title={'Registrar Usuario'} />
            <div className="row wrapper container-register">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg cuadrosD_usuarios" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3 titulosD_usuario">Registrate</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Nombre</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control inputsD_usuarios"
                                name='nombre'
                                value={nombre}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control inputsD_usuarios"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control inputsD_usuarios"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="Vistar Previa del Avatar"></img>
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Escoger Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn-block py-3 botonesD_usuario"
                        >
                            REGISTRAR
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
  )
}

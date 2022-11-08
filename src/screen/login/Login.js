import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/Usuarios';
import { Container, Row, InputGroup, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { object, string, number, date, InferType, bool} from 'yup';

const schema = object().shape({
    email: string().email().required(),
    senha: string().required(),
    terms: bool().required().oneOf([true], 'Terms must be accepted'),
  });
  
const Login = () => {
    const {dataUser} = useSelector(state => state.userReduce)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(true);


        // fetchUser()
    
    const formik = useFormik({
        initialValues: {
            email: '',
            senha:''
        },
        errors:"",
        onSubmit: (values) => {
            dispatch(getUser(values, () => navigate("/Pedido")))
        },
        
    });
    // style={{ flex: "1 1 auto", padding: "1.25rem", textAlign:"center"}}
    return(
        <div className="md:grid  md:grid-cols-7 md:gap-1 md:grid-rows-3 xl:grid-cols-3 ">
            <div className="md:col-span-3 md:col-start-3 xl:col-span-1 xl:col-start-2 mt-5 mx-2">
                <div className="flex flex-col border-2 rounded-2xl border-t-orange-500">
                    <div className=" flex border-b-2 border-gray-200 py-4 justify-center">
                        <img className="will-change-auto" src="http://novasilk.com.br/pedidos/v_05/dist/img/logo_ns.png"/>
                    </div>
                    <div className="flex flex-col text-center p-3">
                        <p>Faça o login para continuar<br/></p>
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="0" controlId="validationFormikUsername">
                                    <InputGroup hasValidation>
                                        <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        isInvalid={!formik.errors.email}
                                        />
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                                        <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="0" controlId="validationFormik03">
                                    <InputGroup >
                                        <Form.Control
                                            type="text"
                                            placeholder="Senha"
                                            name="senha"
                                            value={formik.values.senha}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.senha}
                                        />
                                        <span className="fas fa-lock"/>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.senha}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </Form.Group>
                                </Row>
                                <button className="text-white bg-orange-400 hover:bg-orange-500 border-2 border-orange-400 hover:border-orange-500 rounded-2xl w-full" type="submit">Entrar</button>
                            </Form>
                    </div>
                    <div className="py-3 px-5 border-t-2 border-gray-200">
                        <h6 className="text-xs text-center m-2 text-gray-300">Versão 0.05-beta</h6>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login


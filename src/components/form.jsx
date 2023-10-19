import React, { useRef, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { toast } from "react-toastify";


//CSS do Formulário
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: .5em;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    width: 75%;
    margin: 2em auto;
`;

const InputArea = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;


const Input = styled.input`
    width: 150px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    width: 100px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c732d;
    color: white;
    height: 42px;
`;


//Formulário
const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef(null)

    useEffect (() => {
        if (onEdit) {
            const user = ref.current;

            user.nome_empresa.value = onEdit.nome_empresa;
            user.razao_social.value = onEdit.razao_social;
            user.cnpj.value = onEdit.cnpj;
            user.endereco.value = onEdit.endereco;
            user.cidade.value = onEdit.cidade;
            user.contato.value = onEdit.contato;
            user.telefone.value = onEdit.telefone;
        };
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (!user.nome.value || 
            !user.razao_social.value || 
            !user.cnpj.value || 
            !user.endereco.value || 
            !user.cidade.value ||
            !user.contato.value ||
            !user.telefone.value) {

            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put(`http://localhost:8800/${onEdit.id}`, {
                    nome_empresa: user.nome_empresa.value,
                    razao_social: user.razao_social.value,
                    cnpj: user.cnpj.value,
                    endereco: user.endereco.value,
                    cidade: user.cidade.value,
                    contato: user.contato.value,
                    telefone: user.telefone.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    nome_empresa: user.nome_empresa.value,
                    razao_social: user.razao_social.value,
                    cnpj: user.cnpj.value,
                    endereco: user.endereco.value,
                    cidade: user.cidade.value,
                    contato: user.contato.value,
                    telefone: user.telefone.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }

        user.nome_empresa.value = "";
        user.razao_social.value = "";
        user.cnpj.value = "";
        user.endereco.value = "";
        user.cidade.value = "";
        user.contato.value = "";
        user.telefone.value = "";

        setOnEdit(null);
        getUsers();

    };


    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Input name="nome_empresa" ref={ref} placeholder="Nome da Empresa"/>
            </InputArea>
            <InputArea>
                <Input name="razao_social" ref={ref} placeholder="Razão Social"/>
            </InputArea>
            <InputArea>
                <Input name="cnpj" type="number" ref={ref} placeholder="CNPJ"/>
            </InputArea>
            <InputArea>
                <Input name="endereco" ref={ref} placeholder="Endereço"/>
            </InputArea>
            <InputArea>
                <Input name="cidade" ref={ref} placeholder="Cidade"/>
            </InputArea>
            <InputArea>
                <Input name="contato" ref={ref} placeholder="Contato"/>
            </InputArea>
            <InputArea>
                <Input name="telefone" ref={ref} type="number" placeholder="Telefone"/>
            </InputArea>

            <Button type="submit">Cadastrar</Button>
        </FormContainer>
    )
};

export default Form;
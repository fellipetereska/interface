import React from "react";
import axios from "axios";
import styled from "styled-components";
import{ FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify";

const Table = styled.table`
    width: 75%;
    padding: .1em;
    background-color: #fff;
    padding: 1em;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    margin: 2em auto;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
    
    @media (max-width: 500px){
        ${(props) => props.onlyweb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};

    @media (max-width: 150px){
        ${(props) => props.onlyweb && "display: none"}
    }
`;



const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await axios
        .delete("http://localhost:8800/" + id)
        .then(({data}) => {
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data))

        setOnEdit(null);
    }


    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Empresa</Th>
                    <Th onlyweb>Razao Social</Th>
                    <Th>CNPJ</Th>
                    <Th>Endereço</Th>
                    <Th>Contato</Th>
                    <Th>Telefone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="15%">{item.nome_empresa}</Td>
                        <Td width="15%" onlyweb>{item.razao_social}</Td>
                        <Td width="15%">{item.cnpj}</Td>
                        <Td width="30%">{item.endereco}</Td>
                        <Td width="10%">{item.contato}</Td>
                        <Td width="10%">{item.telefone}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
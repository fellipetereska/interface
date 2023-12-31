import "react-toastify/dist/ReactToastify.css";
import CadastroEmpresa from "./subPages/frmCadastroEmpresa";
import GridCadastroEmpresa from "./subPages/gridCadastroEmpresa";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

function Cadastros () {

  //Instanciando e Definindo como vazio
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Pegando os dados do banco
  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error){
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);


    return (
        <div>
          <CadastroEmpresa onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
          <GridCadastroEmpresa users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>

            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
        </div>
    )
}

export default Cadastros;
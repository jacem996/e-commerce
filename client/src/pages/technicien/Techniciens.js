import { useEffect } from "react";
import {useState} from "react"

const Techniciens = () => {
  const [userList, setuserList] = useState([])

  const fetchData = () => {
    fetch("http://localhost:5000/api/user/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setuserList(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="table" >
        <h2 style={{margin:'40px 0 0 0', textAlign:'center'}}>List of Technicien</h2>
        <table style={{width: '90%', margin:'6rem 0 22.5rem 60px',border:'10px',}}>
 				<thead style={{backgroundColor:'rgb(40 44 52 / 82%)',color:'white'}}>
 						<tr>
 							<th>ID</th>
 							<th>Full Name</th>
 							<th>Email</th>
 							<th>Address</th>
 							<th>Tel</th>
						</tr>
 			  </thead>
 				  <tbody> {userList &&
                userList.filter(el=>el.role === 'technicien').map((user) => (
                <tr key={userList._id}>
                  <td>{user._id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.Tel}</td>
                  <td>
                  
                  </td>
                </tr>
                ))} 
          </tbody>  
          </table>
    </div>
)
}

export default Techniciens;
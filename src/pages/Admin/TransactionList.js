import { Table, Container } from "react-bootstrap";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";

function TransactionList() {
  return (
    <>
      <NavbarAdmin/>
      <Container>
        <h2 className="text-white mt-5">Incoming Transaction</h2>
        <Table striped bordered hover style={{ marginTop: "40px" }}>
          <thead>
            <tr className="bg-dark text-danger">
              <th>No</th>
              <th>Users</th>
              <th>Bukti Transfer</th>
              <th>Film</th>
              <th>Number Account</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* DUMMY */}
          <tbody>
            <tr className="bg-dark">
              <td className="text-white">1</td>
              <td className="text-white">Users</td>
              <td className="text-white">bca.jpg</td>
              <td className="text-white">Spiderman 3</td>
              <td className="text-white">0812948123</td>
              <td className="text-white">Pending</td>
              <td className="text-white"></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default TransactionList;

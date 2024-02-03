import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ResumePage = () => {
    const experiences = [{key: 1, name: "Havelsan", position: "Software Engineer", skills: ["java", "Mysql", "Kafka", "Spring Boot", "React"], from: "15.06.2021", to: "continue"},
                        {key: 2, name: "Akbank TAS", position: "Software Engineer", skills: ["java", "Mysql", "Kafka"], from: "2.03.2021", to: "11.06.2021"},
                        {key: 3, name: "Pia Bilişim", position: "Software Engineer", skills: ["java", "Mysql", "Spring Boot"], from: "15.07.2020", to: "21.02.2021"},
                        {key: 4, name: "Matriks Bilgi Dağıtım Hizmetleri", position: "Software Engineer", skills: ["C++", "High Frequenct Trading", "Concurency"], from: "18.07.2019", to: "21.09.2019"},
                        {key: 5, name: "Matriks Bilgi Dağitim Hizmetleri", position: "Software Engineer", skills: ["NodeJS", "MongoDB", "RestApi",], from: "11.06.2019", to: "18.07.2019"}]
    return (
            
        <Row xs={1} md={2} className="g-3 mx-auto p-3" >
            {experiences.map(experience => (
                <Col key={experience.key} className="mb-3">
                    <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <Card.Body>
                        <Card.Title>{experience.name}</Card.Title>
                        <Card.Text>
                            <p>{experience.position}</p>
                            <p>From: {experience.from} - To: {experience.to}</p>
                            {experience.skills.map(skill => skill + ", ")}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ResumePage;



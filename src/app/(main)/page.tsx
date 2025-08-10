import Banner from "@/components/home/Banner";
import CustomServices from "@/components/home/CustomServices";
import IndustryExpertise from "@/components/home/IndustryExpertise";
import Footer from "@/components/navigations/Footer";

const Home = () => {
 
  return (
    <div className="">
     <Banner></Banner>
     <CustomServices></CustomServices>
     <IndustryExpertise></IndustryExpertise>
     <Footer></Footer>
    </div>
  )
}

export default Home;




//  <div className="p-6 max-w-3xl mx-auto">
//       <Heading level={1} className="mb-6">Welcome to My App</Heading>
      
//       <Card title="User Information" className="mb-6">
//         <Input
//           label="Username"
//           name="username"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Enter your username"
//           className="mb-4"
//         />
        
//         <Paragraph size="small" color="muted" className="mb-4">
//           Please enter your details carefully.
//         </Paragraph>
        
//         <div className="flex justify-end space-x-3">
//           <Button variant="outline" size="small">Cancel</Button>
//           <Button variant="primary" size="small">Submit</Button>
//         </div>
//       </Card>
      
//       <Card variant="elevated">
//         <Heading level={3} className="mb-3">About This App</Heading>
//         <Paragraph className="mb-4">
//           This is a demonstration of reusable components in React.
//         </Paragraph>
//         <Button 
//           variant="primary" 
//           size="large" 
//           onClick={() => alert('Button clicked!')}
//         >
//           Learn More
//         </Button>
//       </Card>
//     </div>
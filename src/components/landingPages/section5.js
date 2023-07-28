// import { Button, Flex, Image, Text } from "@chakra-ui/react";
// import React from "react";
// import sectionImage from "../../asset/sectionImage.png";
// import { useNavigate } from "react-router-dom";
// const Section6 = () => {
//   const navigate = useNavigate();
//   return (
//     <Flex
//       bgColor={"#ebf3ff"}
//       gap={{
//         sm: "20px",
//         md: "35px",
//         lg: "45px",
//       }}
//       p={{
//         base: "10px",
//         sm: "0px 20px",
//         md: "0px 40px",
//         lg: "0px 60px",
//       }}
//       direction={{
//         base: "column",
//         sm: "column",
//         md: "column",
//         lg: "row",
//       }}
//     >
//       <Flex minW={"40%"}>
//         <Image src={sectionImage} objectFit="contain" />
//       </Flex>
//       <Flex
//         direction={"column"}
//         padding={{
//           base: "40px 0px",
//           sm: "20px 10px",
//           md: "30px 15px",
//           lg: "40px 20px",
//         }}
//         gap={{
//           sm: "15px",
//           md: "25px",
//         }}
//         justifyContent={{
//           lg: "space-evenly",
//         }}
       
//       >
//         <Text
//           fontSize={{
//             sm: "25px",
//             md: "35px",
//             lg: "45 px",
//           }}
//         >
//           Learner outcomes on <b style={{ color: "#0056d2" }}>ARIVU</b>
//         </Text>
//         <Text
//           fontFamily={"poppins"}
//           fontSize={{
//             sm: "12px",
//             md: "14px",
//             lg: "16px",
//           }}
//         >
//           According to a recent report by ARIVU (2023),{" "}
//           <span>
//             <b>87% of learners experienced career benefits</b>
//           </span>
//           , including promotions, improved job performance, job transitions,
//           increased employability, and skill development. ARIVU's comprehensive
//           curriculum and recognized certifications contributed to learners'
//           professional growth, enabling them to stay relevant in today's
//           competitive job market.
//         </Text>
//         <Flex mt='15px' >
//           <Button
//             bgColor={"#0056d2"}
//             _hover={{ backgroundColor: "#03357b" }}
//             color={"white"}
//             p={{
//               sm: "10px 20px",
//               md: "15px 30px",
//               lg: "25px 45px",
//             }}
//             onClick={() => navigate("/signup")}
//           >
//             Join for Free
//           </Button>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// export default Section6;
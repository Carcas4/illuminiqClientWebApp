import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Sensors Data Chart" subtitle="Displays data for each sensor." />
      <Box height="74vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
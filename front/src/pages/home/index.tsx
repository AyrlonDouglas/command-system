//MUI
import { Container, Unstable_Grid2 as Grid, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
//COMPONENTS
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ColorRed, ImageFood } from "./styles";
// IMAGES
import BurguerImage from "../../assets/images/burger.jpg";
import DrinkImage from "../../assets/images/drink.jpg";
import ChickenImage from "../../assets/images/chicken.jpg";
import PizzaImage from "../../assets/images/pizza.jpg";

const cardsFood = [
	{ image: BurguerImage, title: "Hambúrgueres", subTitle: "Surpreendendes combinações" },
	{ image: PizzaImage, title: "Pizzas", subTitle: "Sinta-se na Itália" },
	{ image: DrinkImage, title: "Drinks", subTitle: "Para alegrar seu dia" },
	{ image: ChickenImage, title: "Frango Frito", subTitle: "Croc, Croc, Crocância" },
];

export default function Home() {
	const navigate = useNavigate();

	return (
		<>
			<NavBar />
			<Container
				sx={{
					minHeight: "calc(100vh - 132px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Grid
					container
					sx={{
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Grid>
						<Box sx={{ margin: "0 auto", maxWidth: (theme) => theme.breakpoints.values.sm }}>
							<Typography
								variant={"h3"}
								sx={{
									textAlign: "center",
									fontWeight: 600,
									color: (theme) => theme.palette.text.primary,
								}}
							>
								Nós fornecemos a você tudo de melhor
							</Typography>
						</Box>
					</Grid>
					<Grid>
						<Box sx={{ margin: "0 auto", maxWidth: (theme) => theme.breakpoints.values.sm }}>
							<Typography
								variant="h6"
								sx={{
									marginTop: "1rem",
									textAlign: "center",
									fontWeight: 600,
									color: (theme) => theme.palette.text.secondary,
								}}
							>
								SERVIÇOS <ColorRed>|</ColorRed> COMIDAS <ColorRed>|</ColorRed> EXPERIÊNCIAS
							</Typography>
						</Box>
					</Grid>
					<Grid container spacing={2} sx={{ marginTop: "1rem", whiteSpace: "nowrap" }}>
						<Grid sx={{ flex: "1 1 0" }}>
							<Button variant="contained" onClick={() => navigate("/")}>
								Peça aqui
							</Button>
						</Grid>
						<Grid sx={{ flex: "1 1 0" }}>
							<Button variant="outlined" onClick={() => navigate("/")}>
								Cardápio
							</Button>
						</Grid>
					</Grid>
					{/* <Grid
						container
						sx={{ marginTop: "2rem", width: "100%" }}
						spacing={4}
						justifyContent={"center"}
					>
						{cardsFood.map((food, index) => (
							<Grid key={food.title + index} sm={6} md={3} xs={12} sx={{ position: "relative" }}>
								<Box
									sx={{
										textAlign: "center",
										width: "100%",
										maxWidth: "13rem",
										minHeight: "15rem",
										height: "100%",
										borderRadius: "1rem",
										margin: "0 auto",
										position: "relative",
										zIndex: 0,
									}}
								>
									<ImageFood src={food.image} alt={`${food.title}`} loading="lazy" />
									<Typography variant="h6" align="center" sx={{ padding: "0 0.4rem" }}>
										{food.title}
									</Typography>
									<Typography align="center" variant="subtitle2" sx={{ padding: "0 0.4rem" }}>
										{food.subTitle}
									</Typography>
									<Paper
										sx={{
											width: "100%",
											// background: (theme) => theme.palette.background.paper,
											boxShadow: (theme) => theme.shadows[4],
											height: "11rem",
											position: "absolute",
											borderRadius: "0.5rem",
											opacity: "0.7",
											top: 70,
											zIndex: -1,
										}}
									/>
								</Box>
							</Grid>
						))}
					</Grid> */}
				</Grid>
			</Container>
			<Footer />
		</>
	);
}

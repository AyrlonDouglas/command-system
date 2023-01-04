import React from "react";
//MUI
import {
	Unstable_Grid2 as Grid,
	CardActionArea,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

interface FoodCardProps {
	imagePath: string;
	imageAlt: string;
	title: string;
	description: string;
	price: number;
}

export default function FoodCard(props: FoodCardProps) {
	return (
		<Card sx={{ height: "100%" }}>
			<CardActionArea sx={{ height: "100%" }}>
				<Grid container spacing={0} sx={{ height: "100%" }}>
					<Grid xs={4} sx={{ heigth: "100%" }}>
						<CardMedia component="img" height="100%" image={props.imagePath} alt={props.imageAlt} />
					</Grid>
					<Grid xs={8}>
						<CardContent sx={{ height: "100%" }}>
							<Grid
								container
								flexDirection={"column"}
								justifyContent="space-between"
								sx={{ height: "100%" }}
							>
								<Grid>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
										sx={{ textTransform: "capitalize" }}
										fontWeight={600}
									>
										{props.title}
									</Typography>

									<Typography variant="body2" color="text.secondary">
										{props.description}
									</Typography>
								</Grid>
								<Grid sx={{ marginTop: "1rem" }}>
									<Typography variant="body1" color={"primary"} fontWeight={600}>
										{`R$ ${props.price.toFixed(2)}`}
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Grid>
				</Grid>
			</CardActionArea>
		</Card>
	);
}


import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import './RecipeCard.css';

const RecipeCard = ({ id, image, title, subtitle, style }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card style={style} className="size" onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image={image}
          alt={title}
        />
        <CardContent align="left">
          <h3 className="recipesh3">{title}</h3>
          <p className="recipesp">{subtitle}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;

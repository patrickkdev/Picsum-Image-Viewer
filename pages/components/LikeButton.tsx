import { Favorite, FavoriteBorder } from '@mui/icons-material';
import React from 'react'

const LikeButton = () => {
    const [likes, setLikes] = React.useState(Math.floor(Math.random() * 1000))
    const [isLiked, setIsLiked] = React.useState(false)

    const handleLike = () => {
      setIsLiked(!isLiked)
      setLikes(isLiked ? likes - 1 : likes + 1)
    }
  return (
    <div>
        <div onClick={handleLike} style={{marginLeft: "12px", marginTop: "6px", marginBottom: "6px" , gap: "3px", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
        {
            isLiked ? (
                <Favorite sx={{transition: "all 0.2s ease-out", "&:hover": {transform: "scale(1.50)", color: "red"}}} color="error" />
            ) : (
                <FavoriteBorder sx={{transition: "all 0.2s ease-out", "&:hover": {transform: "scale(1.50)", color: "red"}}}/>
            )
        }
        <p>{likes}</p>
        </div>
    </div>
  )
}

export default LikeButton
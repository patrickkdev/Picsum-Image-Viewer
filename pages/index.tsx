/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import styles from "../styles/Home.module.css"
import LikeButton from './components/LikeButton';
import { Container, Dialog, Grid, IconButton, Pagination, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';

export interface ImagemData {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

const Imagens = () => {

  const [viewFullImage, setViewFullImage] = useState<string>()
  const [imagens,setImagens]=useState<ImagemData[]>([])
  const [page, setPage] = useState(1)

  useEffect(()=>{
    fetch(`https://picsum.photos/v2/list?limit=10&page=${page}`).
    then(response => response.json()).
    then(data => setImagens(data))
  }, [page])

  useEffect(()=> {
    const interval = setTimeout(()=>{
      setPage((prev) => prev + 1)
    }, 15000)

    return () => {
      clearTimeout(interval)
    }
  }, [page])

  return (
    <div className={styles.background}> 
      <Container maxWidth="lg">
        <div className={styles.header}>
          <Typography textAlign={"center"} variant="h3">Imagens do Picsum</Typography>
          <Pagination count={14} page={page} onChange={(_, newPage) => setPage(newPage)}/>
        </div>
        <Grid container spacing={2}>
        {
          imagens.map((imagem)=>{
            return (
              <Grid item key={imagem.id} xs={12} sm={6} md={4} lg={3} sx={{height: "100%"}}>
                <div key={imagem.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>{imagem.author}</h3>
                  <img
                    onClick={() => setViewFullImage(imagem.download_url)}
                    src={imagem.download_url}
                    alt={imagem.author}
                    style={{height: "200px", width: "100%", objectFit: "cover", cursor: "pointer"}}
                  />
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <LikeButton />
                    <IconButton onClick={() => setViewFullImage(imagem.download_url)}>
                      <Visibility />
                    </IconButton>
                  </div>
                </div>
              </Grid>
          )})
        }
        </Grid>
      </Container>
      <Dialog fullWidth open={!!viewFullImage} onClose={() => setViewFullImage(undefined)}>
        <img src={viewFullImage} alt="imagem" style={{width: "100%"}}/>
      </Dialog>
    </div>
  )
}

export default Imagens
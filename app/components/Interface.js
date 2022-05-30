import React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";

function Interface() {
  const [text, setText] = useState([]);
  const [result, setResult] = useState([]);
  const [previous, setPrevious] = useState([]);

  const handleSubmitPrompt = async () => {
    console.log(text);
    if (text.length < 1 || text.length > 2000)
      return console.log("text is either too long or too short");
    const res = await fetch("/api/gpt3prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <Box
        sx={{
          width: 1200,
          m: "auto",
          bgcolor: "grey",
          p: 5,
          textAlign: "center",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>Enter your prompt below</Typography>
            <TextField
              fullWidth
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>Response</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "black",
                color: "white",
                borderRadius: 10,
                p: 5,
              }}
            >
              <Typography varian="h3"> GPT Previous Responses</Typography>
              {/* {map.previous((prev, i) => {
                <div key={i}>
                  <Typography>{prev.text}</Typography>
                  <Typography>{prev.result}</Typography>
                </div>;
              })} */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Interface;

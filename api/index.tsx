import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import type { Address } from 'viem'
import { arbitrumNova } from 'viem/chains'; // Ensure this import is correct
import { abi } from '../abi.js'





// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const arbitrumChain = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public',
  },
  blockExplorers: {
    etherscan: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
    default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
  },
  testnet: true,
};


export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  imageAspectRatio: '1:1',  // Semicolon added here
  title: 'Nadiecastle',
  // Optional: Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })

  /*hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": "1ed04817ce38544baa09be36b303ba65c",
      }
    }
  }*/

});





// Define the player object
let player = {
  name: 'player',
  life: 3,
  points: 0,
 
};

// Define the enemy object
let enemy1 = {
  name: 'Enemy 1',
  life: 1,
};

// Define the enemy object
let rng = {
  name: 'rng',
  life: 2,
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type FarcasterID = string;
type playerScore = number;

let farcasterid: FarcasterID = '20359';
let playerscore: playerScore = 0;




interface DataItem {
  fid: string;
  score: number;

  // Add other properties if there are any
}


async function addData(farcasterid: FarcasterID, playerscore: playerScore) {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/farcastleFrame'; // Ensure this is the correct endpoint

  const data = {
    fid: farcasterid,
    score: playerscore,

  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}




//addData(farcasterid, playerscore);
//updateData(farcasterid, playerscore);




async function updateData(farcasterid: FarcasterID, playerscore: playerScore) {
  // Construct the URL using template literals
  const url = `https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/farcastleFrame?fid=eq.${farcasterid}`;
   //console.log(url);
   const data = {
    fid: farcasterid,
    score: playerscore,

    };

  try {
    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH method for updating
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace with your actual token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    // Check if the response body is empty before attempting to parse it as JSON
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}



// Function to fetch data
async function fetchData(): Promise<DataItem[]> {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/farcastleFrame'; // Ensure this is the correct endpoint

  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}






 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




app.frame('/', (c) => {
    let image;
    let intents;
    
    //addData(farcasterid, playerscore);
        
        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmdaxkTnhspf8wRwKuQtTusGxe6H1hZ6BffvaoTdnEB2jF';
        
        intents = [
           
            <Button action="/start">Play</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/start', async (c) => {
    let image;
    let intents;
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    farcasterid = fid !== undefined ? String(fid) : farcasterid;// Use existing farcasterid if fid is undefined
    //addData(farcasterid, playerscore);
        
        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/Qmf4BNvQxNvyXreEAvQpPgj1GSJneFmv7E1A4SAQo6Th3w';
        
        intents = [
           
            <Button action="/southChoice1">South</Button>,
            <Button action="/NorthChoice1">North</Button>,
            
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/southChoice1', (c) => {
    let image;
    let intents;

        
        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRpJXp7Bh6g8CUe6reTfk8r6G1xZdYQCtt4zt99af8zeF/1.png';
        
        intents = [
           
           <Button action="/Balthazar">Balthazar</Button>,
           <Button action="/Thobias">Thobias</Button>,
           <Button action="/Marcus">Marcus</Button>,
           <Button action="/southChoice2">Next</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});









app.frame('/Balthazar', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Balthazar Stormridge !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Balthazar');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s1.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Thobias', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Thobias Flameborn !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Thobias');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s2.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Marcus', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Marcus Emberforge !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Marcus');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s3.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});









app.frame('/southChoice2', (c) => {
    let image;
    let intents;

        
        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRpJXp7Bh6g8CUe6reTfk8r6G1xZdYQCtt4zt99af8zeF/2.png';
        
        intents = [
           
           <Button action="/Ravenna">Ravenna</Button>,
           <Button action="/Lucan">Lucan</Button>,
           <Button action="/Gareth">Gareth</Button>,
           <Button action="/southChoice3">Next</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});







app.frame('/Ravenna', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lady Ravenna Sunworn !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Ravenna');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s4.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Lucan', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Lucan Duskfall !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Lucan');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s5.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Gareth', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Gareth Darkriver !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Gareth');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s6.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});







app.frame('/southChoice3', (c) => {
    let image;
    let intents;

        
        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRpJXp7Bh6g8CUe6reTfk8r6G1xZdYQCtt4zt99af8zeF/3.png';
        
        intents = [
           
           <Button action="/Leoric">Leoric</Button>,
           <Button action="/Seraphine">Seraphine</Button>,
           <Button action="/Isolde">Isolde</Button>,
           <Button action="/southChoice1">Back</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});





app.frame('/Leoric', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lord Leoric Ashenwood !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Leoric');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s7.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Seraphine', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lady Seraphine Nightbloom !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Seraphine');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s8.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Isolde', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lady Isolde Farrow !attack north";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Isolde');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmXP1iaGSg4PdAppDGXxFsZfctmcZVdArVzpVnmpwuJXCp/s9.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});













app.frame('/NorthChoice1', (c) => {
    let image;
    let intents;
    //addData(farcasterid, playerscore);
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    farcasterid = fid !== undefined ? String(fid) : farcasterid; // Use existing farcasterid if fid is undefined

        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRGQXMEmJfzYqZ5ZtN7xpjaszNg4peawgeh6X4SRNLzvA/1.png';
        
        intents = [
           
           <Button action="/Gwyneth">Gwyneth</Button>,
           <Button action="/Bryndis">Bryndis</Button>,
           <Button action="/Roderic">Roderic</Button>,
           <Button action="/NorthChoice2">Next</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});









app.frame('/Gwyneth', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lady Gwyneth Aldwin !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Gwyneth');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n1.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Bryndis', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lady Bryndis Hawke !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Bryndis');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n2.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Roderic', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Lord Roderic Thorne !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Roderic');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n3.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});






app.frame('/NorthChoice2', (c) => {
    let image;
    let intents;
    //addData(farcasterid, playerscore);
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    farcasterid = fid !== undefined ? String(fid) : farcasterid; // Use existing farcasterid if fid is undefined

        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRGQXMEmJfzYqZ5ZtN7xpjaszNg4peawgeh6X4SRNLzvA/2.png';
        
        intents = [
           
           <Button action="/Eadric">Eadric</Button>,
           <Button action="/Edwin">Edwin</Button>,
           <Button action="/Eric">Eric</Button>,
           <Button action="/NorthChoice3">Next</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});








app.frame('/Eadric', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Eadric Blackwood !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Eadric');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n4.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Edwin', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Edwin Frostshield !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Edwin');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n5.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Eric', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Eric Greyvein !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Eric');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n6.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});







app.frame('/NorthChoice3', (c) => {
    let image;
    let intents;
    //addData(farcasterid, playerscore);
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    farcasterid = fid !== undefined ? String(fid) : farcasterid; // Use existing farcasterid if fid is undefined

        image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRGQXMEmJfzYqZ5ZtN7xpjaszNg4peawgeh6X4SRNLzvA/3.png';
        
        intents = [
           
           <Button action="/Gregorius">Gregorius</Button>,
           <Button action="/Alistair">Alistair</Button>,
           <Button action="/Cedric">Cedric</Button>,
           <Button action="/NorthChoice1">Back</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});










app.frame('/Gregorius', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Gregorius Heder !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Gregorius');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n7.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Alistair', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Alistair Ironheart !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Alistair');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n8.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});


app.frame('/Cedric', (c) => {
  
  const baseUrl = "https://warpcast.com/~/compose";
  const text = "I Sir Cedric Stonehelm !attack south";
  const embedUrls = [];
  embedUrls.push('https://nadie-hackhathon.vercel.app/api/Cedric');
  const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrls[0])}`;    


  let image = 'https://copper-immediate-mongoose-351.mypinata.cloud/ipfs/QmRvB3xrHboVvhktVs7uLoneYi5BamcLSZuKBMEnXVaBbp/n9.png';
  const intents = [
    <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
    <Button action="/">Home</Button>,
  ];

  return c.res({
    image: image,
    intents: intents,
  });
});





















//////////////////////////////////////////////////////////////////////////

app.transaction('/mint', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      0n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:421614`,
    to: '0x7C5B213CAaf6ebbcB6F1B24a193307261B1F6e69',
  });
});












// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

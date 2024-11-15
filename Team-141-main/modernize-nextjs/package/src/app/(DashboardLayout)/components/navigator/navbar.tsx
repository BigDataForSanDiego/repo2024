"use client";
import Link from 'next/link';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#00684A', padding: '1rem' }}>
      <Toolbar>
        <Box
          component="img"
          src="/images/logos/mongoDB.svg"
          sx={{ width: '2%', marginLeft: '1rem', display: 'inline-block' }}
          alt="MongoDB Logo"
        />
        <Box
          component="ol"
          sx={{
            listStyleType: 'none',
            display: 'flex',
            marginLeft: '5rem',
            padding: 0,
          }}
        >
          <Box component="li" sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" component="div">
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
            </Typography>
          </Box>
          <Box component="li" sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" component="div">
              <Link href="/utilities/gen-ai-report" style={{ textDecoration: 'none', color: 'inherit' }}>
                QnA
              </Link>
            </Typography>
          </Box>
          <Box component="li" sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" component="div">
              <Link href="/utilities/teach" style={{ textDecoration: 'none', color: 'inherit' }}>
                Train
              </Link>
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

// "use client";
// import Link from 'next/link';

// const NavBar: React.FC = () => {

//   return (
//     <nav style={{ backgroundColor: '#00684A', padding: '1rem' }}>
//       <ol style={{ listStyleType: 'none', margin: 10, padding: 0 }}>
//         <img src='/images/logos/mongoDB.svg' width={"1%"} style={{ display: 'inline', marginLeft: '1rem' }} />
//         <li style={{ display: 'inline', marginLeft: '5rem' }}>
//           <Link href="/">
//             Home
//           </Link>
//         </li>
//         <li style={{ display: 'inline', marginLeft: '2rem' }}>
//           <Link href="/utilities/gen-ai-report">
//             QnA
//           </Link>
//         </li>
//         <li style={{ display: 'inline', marginLeft: '2rem' }}>
//           <Link href="/utilities/teach">
//             Train
//           </Link>
//         </li>
//       </ol>
//     </nav>
//   );
// };

// export default NavBar;
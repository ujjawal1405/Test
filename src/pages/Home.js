import React from 'react'
import Box from '@mui/material/Box'
import Navbar from '../components/Navbar'
import { Button, FormGroup } from '@mui/material'
import { TextField , TableBody , TableCell , TableContainer , TableRow } from '@mui/material'
import { toast } from 'react-hot-toast'
import { Table } from '@mui/material'
import { TableHead } from '@mui/material'
import { Paper } from '@mui/material'
import { TablePagination } from '@mui/material'
import { TableFooter } from '@mui/material'
import { TableSortLabel } from '@mui/material'
import axios from 'axios'
import AddModal from '../components/AddModel'



const Home = () => {

    const url = "https://jsonplaceholder.typicode.com/posts"

    const [posts, setPosts] = React.useState([])
    const [openEditModel , setOpenEditModel] = React.useState(false)
    const [openAddModel, setOpenAddModel] = React.useState(false)
    const [post, setPost] = React.useState({})
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('id')


    // edit text fields

    const [title, setTitle] = React.useState('')
    const [body, setBody] = React.useState('')
    const [userId, setUserId] = React.useState(1)

    // onClick edit button

    const handleEditButtonClick = (id) => {
        window.scroll(0 , 0)
        setOpenEditModel(true);
        setUserId(id);
    }

    // submit edited data 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userId , title , body)
        handleUpdate(userId, title, body);
        setOpenEditModel(false);
    }
    
    
    const handleUpdate = (post_id, title, body) => {
        const data = axios.put(`${url}/${post_id}`, {
            title: title,
            body: body
        })

        data.then((response) => {
            const newPosts = posts.map((post) => {
                if (post.id === post_id) {
                    return response.data
                }
                return post
            })
            setPosts(newPosts)
        }
        )
    }

    const handleAddPost = (title, body , userId) => {

        const data = axios.post(url, {
            title: title,
            body: body,
            userId: userId
        })
        
        // unshift is used to add the new post at the beginning of the array

        data.then((response) => {
            setPosts([response.data, ...posts])
        })

        toast.success("Post added successfully")
    }


    const handleDelete = (post_id) => {
        const newPosts = posts.filter((post) => post.id !== post_id)
        setPosts(newPosts)
        toast.success("Post deleted successfully")
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0

    const handleFetchPosts = async () => {
        try {
            const response = await axios.get(url)
            setPosts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        handleFetchPosts()
    }, [])



    return (
        <>
            <Navbar />   
            <Box>

                             {
                                openEditModel && 
                                       <form style={{
                                             marginTop: 50,
                                                padding: 2,
                                                width: 500,
                                         
                                       }}>
                                             <TextField
                                                label="Title"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <TextField
                                                label="Body"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                            />
                                            <Button onClick={handleSubmit}> 
                                                Submit
                                            </Button>
                                       </form>
                             }  

                <FormGroup>
                    <TableContainer component={Paper}>
                        {/* add button here for new post 
                         */}

                        <Table sx ={{
                            marginTop : 10,
                            height: "60vh",
                        }} aria-label="simple table">
                              
                                    <Button variant="contained" color="primary" sx= {{
                                            float : "right",
                                    }} onClick={() => setOpenAddModel(true) }>
                                        Add Post
                                    </Button>
                           

                             {
                                openAddModel && <AddModal
                                    open={openAddModel}
                                    setOpen={setOpenAddModel}
                                    post={post}
                                    setPost={setPost}
                                    handleAddPost={handleAddPost} 
                                    handleClose = {() => setOpenAddModel(false)}
                                />
                             }

                            <TableBody>
                                {posts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((post) => (
                                        <TableRow
                                            key={post.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {post.id}
                                            </TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>{post.body}</TableCell>
                                            <TableCell sx={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                            }}>
                                                <Button variant="contained" onClick={() => handleEditButtonClick(post.id)}  sx ={{
                                                    marginRight : 2,
                                                }}>Edit</Button>
                                                <Button variant="contained" onClick={() => handleDelete(post.id)} sx ={{
                                                    marginLeft : 2,
                                                    backgroundColor : "red",
                                                }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={posts.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </FormGroup>
            </Box>
        </>
    )
}

export default Home;


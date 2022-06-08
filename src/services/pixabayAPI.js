import axios from "axios";

export async function fetchPictures(input, page = 1) {
  const result = await axios(`https://pixabay.com/api/?q=${input}&page=${page}&key=24511799-4a7f974650a4e56ef46644e1e&image_type=photo&orientation=horizontal&per_page=12`);
  return result.data;
}

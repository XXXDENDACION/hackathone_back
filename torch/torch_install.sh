git clone https://github.com/CompVis/taming-transformers &> /dev/null
pip install ftfy regex tqdm omegaconf pytorch-lightning  &> /dev/null
pip install kornia                                       &> /dev/null
pip install einops                                       &> /dev/null
echo "Installing transformers library..."
pip install transformers                                 &> /dev/null
echo "Installing taming.models..." 
pip install taming.models                                &> /dev/null
 
echo "Installing libraries for managing metadata..."
pip install stegano                                      &> /dev/null
apt install exempi                                       &> /dev/null
pip install python-xmp-toolkit                           &> /dev/null
pip install imgtag                                       &> /dev/null
pip install pillow==7.1.2   
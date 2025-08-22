import glob, os

IMAGES_FOLDER_PATH: str = "images"
OUTPUT_PATH: str = "output"

if not os.path.exists(IMAGES_FOLDER_PATH):
    os.makedirs(IMAGES_FOLDER_PATH)
if not os.path.exists(OUTPUT_PATH):
    os.makedirs(OUTPUT_PATH)
os.chdir(IMAGES_FOLDER_PATH)


def get_formatted_words(string: str, split_char: str) -> list[str]:
    words: list[str] = []
    for idx, word in enumerate(string.split(split_char)):
        if idx == 0 and len(word) > 1:
            words.append(word)
        else:
            words.append(word.capitalize())
    return words


# search for images files
extensions: list[str] = ["*.jpg", "*.png"]
images: list[str] = []
for ext in extensions:
    images.extend(glob.glob(ext))
images = sorted(images)

# generate imports string
imports: list[str] = []
for image in images:
    name: str = image.split(".")[0]
    words: list[str] = get_formatted_words(name, "-")
    import_name = "".join(words)
    imports.append(f'import {import_name} from "../{IMAGES_FOLDER_PATH}/{image}"')
imports_str: str = "\n".join(imports)

# generate dictionaries list with images data
image_dictionaries_list: list[str] = []
for image in images:
    name: str = image.split(".")[0]
    words = get_formatted_words(name, "-")
    name = "".join(words)
    dictionary = f'{{ name: "{name}", url: {name} }},'
    image_dictionaries_list.append(dictionary)

file_content = f"""import {{ StaticImageData }} from "next/image"

{imports_str}

type ImageItem = {{
  name: string;
  url: StaticImageData;
}}

const imagesArray: ImageItem[] = [
{"\n".join(image_dictionaries_list)}
]

export {{ imagesArray, type ImageItem }}"""

os.chdir(f"../{OUTPUT_PATH}")
with open("images.ts", "w") as f:
    f.write(file_content)

import zipfile
from pathlib import Path


def create_zip_from_file_list(file_list_path, zip_file_path):
    # 現在のディレクトリを取得
    current_dir = Path.cwd()

    # ファイルリストを読み込む
    with open(file_list_path, "r") as file_list:
        files_to_zip = [line.strip() for line in file_list]

    # zipファイルを作成
    with zipfile.ZipFile(zip_file_path, "w") as zipf:
        for file in files_to_zip:
            file_path = current_dir / file
            if file_path.exists() and file_path.is_file():
                zipf.write(file_path, arcname=file)


# 使用例
create_zip_from_file_list("dist-files.txt", "dist.zip")


path = r"c:\Users\aeadi\Desktop\mone-demo.vercel.app\_next\static\chunks\pages\_app-a6eeb0521308501a.js"
try:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    print(f"File size: {len(content)}")

    terms = ["websiteTitle", "Copyright", "Mone", "Portfolio", "Contact", "8984:"]
    for term in terms:
        index = content.find(term)
        if index != -1:
            print(f"\nFound '{term}' at index {index}:")
            start = max(0, index - 100)
            end = min(len(content), index + 500)
            print(content[start:end])
        else:
            print(f"'{term}' not found")

except Exception as e:
    print(f"Error: {e}")

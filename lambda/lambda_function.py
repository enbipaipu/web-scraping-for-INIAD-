def test(event):
    print("-------")
    print(event["key1"])
    print(event["key2"])
    print(event["key3"])
    print("-------")
    return event["key1"]

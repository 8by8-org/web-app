import { generateURL, getUrlData, getUserData } from './URLEncode';
test('Basic URL Encoding test', () => {
    // The encoded array being tested
    const input = [
        '11df62a4-272a-11ec-9621-0242ac130002', // The UUID
        new Date('1995-12-17T03:24:00'), // The Date
        true, // LinkShared
    ];

    // What the value should be, manually computing these values
    const output = `${window.location.origin}/playerwelcome?code=MTFkZjYyYTQtMjcyYS0xMWVjLTk2MjEtMDI0MmFjMTMwMDAyLFN1biBEZWMgMTcgMTk5NSAwMzoyNDowMCBHTVQtMDgwMCAoUGFjaWZpYyBTdGFuZGFyZCBUaW1lKSx0cnVl`;
    expect(generateURL(input)).toBe(output);
});

test('Basic URL Decoding test', () => {
    // Sample UrlCode to be decoded
    const input = 'MTFkZjYyYTQtMjcyYS0xMWVjLTk2MjEtMDI0MmFjMTMwMDAyLFN1biBEZWMgMTcgMTk5NSAwMzoyNDowMCBHTVQtMDgwMCAoUGFjaWZpYyBTdGFuZGFyZCBUaW1lKSx0cnVl';
    const output = [
        '11df62a4-272a-11ec-9621-0242ac130002', // The UUID
        'Sun Dec 17 1995 03:24:00 GMT-0800 (Pacific Standard Time)', // The Date
        'true', // LinkShared
    ];
    expect(getUrlData(input)).toStrictEqual(output);
});
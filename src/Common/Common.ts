const CommonService = () => {


    const generateAutoNumber = (): number => {
        const min = 100000; // Minimum 6 digit number
        const max = 999999; // Maximum 6 digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    const generateFilenameWithTimestamp = (originalFilename: string): string => {
        // Get the current timestamp
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');

        // Extract the file extension if present
        const dotIndex = originalFilename.lastIndexOf('.');
        const baseName = dotIndex !== -1 ? originalFilename.substring(0, dotIndex) : originalFilename;
        const extension = dotIndex !== -1 ? originalFilename.substring(dotIndex) : '';

        // Generate the new filename with the timestamp
        const newFilename = `${baseName}_${timestamp}${extension}`;

        return newFilename;
    }


    const removeFilenameWithTimestamp = (filename: string): string => {
        // Regular expression to match the timestamp pattern with the leading underscore in the filename
        const timestampPattern = /_\d{8}T\d{9}Z/;
        // Replace the matched pattern with an empty string
        const newFilename = filename.replace(timestampPattern, '');
        return newFilename;
    }

    return {
        generateAutoNumber,
        generateFilenameWithTimestamp,
        removeFilenameWithTimestamp
    };
}

export default CommonService;
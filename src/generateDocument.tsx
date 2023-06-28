import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';


function loadFile(url: any, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
}

const generateDocument = (values: any) => {
    let URL
    if(values.document_name == 'STRUCTURAL SUBSTANTIATION'){
        URL = 'https://res.cloudinary.com/dybzg1qac/raw/upload/v1687198680/STRUCTURAL_SUBSTANTIATION_hny7ot.docx'
    }
    if(values.document_name == 'INSTALLATION DATA LIST'){
        URL = 'https://res.cloudinary.com/dybzg1qac/raw/upload/v1687358592/INSTALLATION_DATA_LIST_q4v0w9.docx'
    }

    if(values.document_name == 'INSTRUCTIONS FOR CONTINUED AIRWORTHINESS'){
        URL = 'https://res.cloudinary.com/dybzg1qac/raw/upload/v1687358592/INSTRUCTIONS_FOR_CONTINUED_AIRWORTHINESS_vfgkrd.docx'
    }
    loadFile(
        URL,
        function (error: any, content: any) {
            if (error) {
                throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.setData(values);
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render();
            } catch (error) {
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                // @ts-ignore
                function replaceErrors (key: any, value: any) {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function (
                                error,
                                key
                            ) {
                                // @ts-ignore
                                error[key] = value[key];
                                return error;
                            },
                            {});
                    }
                    return value;
                }
                console.log(JSON.stringify({ error: error }, replaceErrors));

                // @ts-ignore
                if (error.properties && error.properties.errors instanceof Array) {
                    // @ts-ignore
                    const errorMessages = error.properties.errors
                        .map(function (error: any) {
                            return error.properties.explanation;
                        })
                        .join('\n');
                    console.log('errorMessages', errorMessages);
                    // errorMessages is a humanly readable message looking like this :
                    // 'The tag beginning with "foobar" is unopened'
                }
                throw error;
            }
            var out = doc.getZip().generate({
                type: 'blob',
                mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }); //Output the document using Data-URI
            const fileName = values.document_name + "_" + Date.now()
            saveAs(out, fileName);
        }
    );
};

export default generateDocument;


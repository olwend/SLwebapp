import * as Yup from "yup";
import JSZip from 'jszip';
import { zipMimeOptions } from "./zipMimeOptions";

async function zipValidation(file) {
  if(file){
    console.log(file)

    let fileNames =[]
    let readmeFound = false
    let new_zip = new JSZip()
    readmeFound = await new_zip.loadAsync(file)
      .then(function(zip) {
        zip.forEach(function (file) {
          fileNames.push(file.toLowerCase())
        })
        return fileNames.includes('readme.md')
      })
    return readmeFound
  }
}

export const yupSchema = (props) => Yup.object().shape({
    labName: Yup.string()
      .min(2, "* Names must have at least 2 characters")
      .max(100, "* Names can't be longer than 100 characters")
      .required("* Name is required"),
    description: Yup.string().required("* Description is required"),
    baseGitUrl: Yup.string()
      .notRequired()
      .matches(/^(git@[\w.-]+)(:(\/\/)?)([\w.@:/~-]+)(\.git)(\/)?$/, "* Please enter a valid ssh URL"),
    categories: Yup.array()
      .nullable()
      .required("* Pick at least 1 Category")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
    types: Yup.array()
      .nullable()
      .required("* Pick at least 1 Type")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
    resourcesCPUMEM: Yup.string()
      .nullable()
      .required("* Please select a Resource Setting"),
    timer: Yup.string().required("* Please select a Timer Duration"),
    containerDefinition: Yup.array().of(
      Yup.object().shape({
        shortName: Yup.string().required("* Enter a Short Name"),
        image: Yup.string().required("* Enter an image name"),
      })
    ),
    achievements: Yup.boolean(),
    achievementsImage: Yup.string()
    .when("achievements", {
        is: true,
        then: Yup.string().required( "* Achievements are enabled, an image name is required.")
    }),

    // achievementsDebug can't be enabled if active is enabled
    active: Yup.boolean(),
    achievementsDebug: Yup.boolean()
    .when("active", {
      is: true,
      then: Yup.boolean().oneOf([false], '* Debug cannot be enabled for an active lab.')
    })

    // achievementsDebug can't be enabled if achievements is disabled
    .when("achievements", {
      is: false,
      then: Yup.boolean().oneOf([false], '* Debug cannot be enabled for disabled achievements.')
    }),

    // Integrated Website value cannot be empty if feature is enabled
    integratedWebsite: Yup.boolean(),
    integratedWebsiteURL: Yup.string()
    .when("integratedWebsite", {
        is: true,
        then: Yup.string().required( "* Integrated website is enabled, an URL is required.")
    }),

    file: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
        "required",
        "* README is required",
        value => props.location.pathname.includes("/edititem") || value
    )
    .test(
      "readme in zip",
      "* Your zip file must include a readme",
      async file => {
        if (file && zipMimeOptions.includes(file.type)) {
          return await zipValidation(file)
        } else {
          return true 
        }
      }
    )
    .test(
      "size",
      "* Max attachment size is 20MB",
      value => !value || props.location.pathname.includes("/edititem") || (value && value.size <= 20000000 )
    )
    .test(
      "fileFormat",
      "* Unsupported Format",
      value => !value || props.location.pathname.includes("/edititem") || (value && ( value.name.includes(".md") || value.name.includes(".zip") ))
    )
  });
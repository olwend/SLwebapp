![](logo.png)

---

# 1. Goals and description

 1. How to create a Cloudformation stack from a template

 2. How to add outputs

 3. How to update resources

 4. How are parameters supported

 5. What is auto-rollback

 6. What is Drift Detection

 7. How to clean upresoruces

---

# 2. Administration

This lab requires you to have access to an AWS account that is not provided in this lab.

The majority of our lab actions will be done from the AWS management console.

SkillsLounge will provide the base code for us to upload to AWS.

We will make updates to this file via the AWS in-built designer.

![](CloudFormation0.png)

---

# 3. Introduction

For this lab, we will explore how to use CloudFormation templates in the AWS management console to create infrastructure.

We will be creating an EC2 instance and a Security Group to manage connections to it.

We will introduce parameters and outputs and several other features of CloudFormation.

---

# 4. Access CloudFormation

Login into your AWS console with the AWS credentials youâ€™ve been provided.

Ensure you are in the *ap-southeast-1* region.

![](CloudFormation1.png)

---

## Access CloudFormation

Navigate to the CloudFormation service under the Management & Governance subsection.
  * Alternatively, use the search bar.

![](CloudFormation2.png)

---

# 5. Create Stack

On the main page, click the *Create stack* button.

![](CloudFormation3.png)

---

# 6. Create Template

There are 3 option available in providing the CloudFormation template needed.

We will be creating our own.

![](CloudFormation4.png)

---

## Create Template

Navigate to the *Create template in Designer* option and click to use the designer.

![](CloudFormation5.png)

---

## Create Template

In SkillsLounge, open the file explorer and copy the content of the **cf_base.yml** file.

![](CloudFormation6.png)

---

## Create Template

Select YAML as the template language.

Switch the file to *Template* at the bottom and paste the content of the file provided in SkillsLounge.

![](CloudFormation7.png)

---

## Create Template

Note that the *ImageId* value is specific to the region you are in. 

The value provided in this lab is valid for the *ap-southeast-1* region.

If you create the stack is a different region, you will be required to update the ami id.

---


## Create Template

Click the refresh button on the top right to see the resources and their dependencies.

Clicking the checkbox will validate the file.

Once done, click the upload icon.

![](CloudFormation8.png)

---

## Create Template

Notice that the option has been automatically switched to *Template is ready* . This is expected.

AWS has automatically created a S3 bucket and uploaded our template file to it, as well as filling in the S3 URL field.

Click *Next* to proceed.

![](CloudFormation9.png)

---

# 7. Create Stack

Provide the following stack name:
  * **<YOUR INITIALS>-cf-stack**

Click *Next* to proceed.

![](CloudFormation10.png)

---

## Create Stack

For the Configure stack options page, you may leave the values empty/as their default.

This page contains useful administration capabilities like Termination protection and Rollback configurations that are not covered in this lab.

Click *Next* at the bottom to proceed.

---

## Create Stack

For now, there is nothing to review on the stack review page.

Click *Create stack* to proceed.

---

## Create Stack

Give the stack a few minutes to complete.

Refresh the events as necessary.

![](CloudFormation11.png)

---

## Create Stack

Click the *Resources* tab to see the details of resources created.

Clicking on their Physical IDs will open up their respective details page in AWS.

![](CloudFormation12.png)

---

# 8. Access Tomcat

To access the instance & Tomcat, we will need the public IP of the EC2 instance.

Instead of always navigating to the resource page and switching to the resource detail page, we will use Outputs.

---

# 9. Update Stack

Click the *Update* button.

![](CloudFormation13.png)

---

## Update Stack

Navigate to *Edit template in designer* and click view in *Designer*.

![](CloudFormation14.png)

---

# 10. Add Output

Scroll to the bottom of the template file and copy the following code:

```
Outputs:
  TomcatURL:
    Description: The URL to access Tomcat
    Value: !Join
      - ''
      - - 'http://'
        - !GetAtt
          - TomcatInstance
          - PublicIp
        - ':8080'
```

---

## Add Output

It should look like this:
  * Pay attention to the indents.

Upload the file by pressing the upload button at the top.

Click *Next* all the way.

When prompted, proceed to apply the stack.

![](CloudFormation15.png)

---

## Add Output

Click the *Outputs* section in the stack.

Notice the Tomcat URL output we added.

![](CloudFormation16.png)

---

## Add Output

Is Tomcat accessible now?

Does the connection timeout?

![](CloudFormation17.png)

---

# 11. Update Security Group

A change set can be created to review the details of a change before being applied to the stack.

This can be particularly useful for auditing and logging purposes as well.

It also inspires confidence in the user to preview how the changes will affect resources, especially in the event that resources will be deleted.

---

## Update Security Group

Navigate to the *Change sets section*.

Click *Create change set*.

![](CloudFormation18.png)

---

## Update Security Group

Navigate to *Edit template in designer* and click view in *Designer*.

![](CloudFormation19.png)

---

## Update Security Group

Add the following ingress rule.

```
        - IpProtocol: tcp
          FromPort: 8080
          ToPort: 8080
          CidrIp: 0.0.0.0/0
```

---

## Update Security Group

Pay attention to the indentation:

![](CloudFormation20.png)

---

## Update Security Group

Validate and upload the change.

![](CloudFormation21.png)

---

## Update Security Group

Click *Next* all the way.

Proceed with the change set creation.

When prompted for the final confirmation:
  * Description: **Update Security Group**.

Click the *Create change set* button to complete the process.

![](CloudFormation22.png)

---

## Update Security Group

Here, the change set can be reviewed. (refresh if necessary)

Notice the Security Group will be modified, without being replaced.

![](CloudFormation23.png)

---

## Update Security Group

Click the *Execute* button to proceed.

![](CloudFormation24.png)

---

## Update Security Group

Once the update is complete, go to the output and access Tomcat.

![](CloudFormation25.png)

---

# 12. Parameters

CloudFormation supports the concept of input parameters, which allows for far more flexibility when creating resources.

Besides user inputs, CloudFormation parameters also support default values.

In this lab, the parameters used will be for tagging though they can be used to select instance AMIs, sizes and security group ports as well.

---

## Parameters

Click the *Update* button.

![](CloudFormation26.png)

---

## Parameters

Navigate to *Edit template in designer* and click view in *Designer*.

![](CloudFormation27.png)

---

## Parameters

Add the following code to the template at the top of the file.

Take note of the indentation:

```
Parameters:
  AttendeeName:
    Type: String
    Description: Your Name
  Initials:
    Type: String
    Description: The initials of your name
  ResourceRole:
    Type: String
    Default: TFIP
    Description: The Purpose of these resources
```

---

## Parameters

The template should look like this:

Currently, there is **no validity** in uploading the file as CloudFormation will not detect any resource change and will reject this.

Instead, we will move on to the next section regarding Rollbacks.

![](CloudFormation28.png)

---

# 13. Rollback

CloudFormation supports automatic rollback that can be applied during stack creation and updating.

This feature can be customised.

By default, CloudFormation will roll back changes that have failed during a stack update.

---

## Rollback

In the template, make an update to add tags to the *EC2 instance*:
  * Notice that there is a typographical error. This is intended.

```
      Tags: 
        - Ke: "Name"
          Value: !Sub '${Initials}_tomcat_instance'
        - Key: "Owner"
          Value: !Ref AttendeeName
        - Key: "Role"
          Value: !Ref ResourceRole
```

---

## Rollback

The file should look like the following:

![](CloudFormation29.png)

---

## Rollback

Make an update to add tags to the *Security Group*.
  
  Make note of the indentation. There is no typographical error here:

```
        Tags: 
        - Key: "Name"
          Value: "Lab - Allow Access"
        - Key: "Owner"
          Value: !Ref AttendeeName
        - Key: "Role"
          Value: !Ref ResourceRole
```
---

## Rollback

The file should look like the following:

![](CloudFormation30.png)

---

# 14. Parameters

**Ensure that you first copy the contents of the Cloudformation template into SkillsLounge.**
 
**The code will be rejected by AWS and you will lose your changes.**

Validate and upload the file.

Click *Next* to proceed.

On the *Specify stack details* page, provide the following parameters:
  * AttendeeName: **<YOUR NAME>**
  * Initials: **<YOUR INITIALS>**
  * ResourceRole: **TFIP** (default)

![](CloudFormation31.png)

---

# 15. Rollback

Click *Next* until your each the *Review* page.

You can review the parameters as well as the change set preview indicating that the resources will only be modified and not re-created.

Click *Update stack* when done.

![](CloudFormation32.png)

---

## Rollback

Navigate to the Resources section and click the Security Group.

![](CloudFormation33.png)

---

## Rollback

Refresh the page and notice the Tags.

If they are not present, CloudFormation has likely already completed its rollback process.

![](CloudFormation34.png)

---

## Rollback

Refresh the page again and the tags will have disappeared.

![](CloudFormation35.png)

---

## Rollback

Return to the CloudFormation Events page and refresh it.

Notice the *UPDATE_ROLLBACK_COMPLETE* message.

![](CloudFormation36.png)

---

## Rollback

Upon a failed stack apply like this, CloudFormation automatically reverts the changes made, even if they were successfully applied to a resource.

Thatâ€™s why the tags for the Security Group were removed despite succeeding.

---

# 16. Update Tags

Copy the code backed up in SkillsLounge and fix the typo.
  * The typo is in the Key. (Change Ke to Key)

Provide the same parameters as before.

Apply the update.

---

## Update Tags

Navigate to the resources section and click on the resource.

Confirm the tags have been applied to the respective resources.

![](CloudFormation37.png)

---

# 17. Drift Detection

On the EC2 resource, under the *Tags* section, click the *Manage tags* button.

![](CloudFormation38.png)

---

## Drift Detection

Add a new tag with the following:
  * Key: **Test**
  * Value: **Drift**


Click *Save* when done.

![](CloudFormation39.png)

---

## Drift Detection

Return to the CloudFormation tab and under *Stack actions* , click *Detect Drift*.

![](CloudFormation40.png)

---

## Drift Detection

Then, under *Stack actions* , click *View drift results*.

![](CloudFormation41.png)

---

## Drift Detection

Here you can see that there has been a drift in the resource configuration.

![](CloudFormation42.png)

---

## Drift Detection

Select the Tomcat instance and view the drift details.

![](CloudFormation43.png)

---

## Drift Detection

Here, under the Differences section, you can see the 2 differences.

1. The *SecurityGroupIds.0* is a result of the way CloudFormation assigns the ID.

2. The *Tag.3* is the tag that we manually added.

![](CloudFormation44.png)

---

## Drift Detection

CloudFormation has native drift detection capability.

This allows users to detect if changes were manually made instead of from a change set.

This helps in the management of a stackâ€™s resource and can help smoothen remediation by pinpointing exactly what was modified or changed.

---

# 18. Cleanup

As is best practice, when a resource no longer needs to be used, it should be deleted.

CloudFormation stacks can be deleted by pressing the *Delete* button.

![](CloudFormation45.png)

---

## Cleanup

Next, navigate to the S3 bucket service.

Select the bucket used to store the template.

It should be in the form *cf-template-<random string>-ap-southeast-1*

Click the *Empty* button.

![](CloudFormation46.png)

---

## Cleanup

Non-empty S3 buckets cannot be deleted.

On the next page, type **permanently delete**

Click *Empty*.

![](CloudFormation47.png)

---

## Cleanup

Click *Exit* to return to the bucket list

Click the *Delete* Button.

![](CloudFormation48.png)

---

## Cleanup

Fill in the name of the bucket to confirm deletion.

Complete the process by clicking the *Delete bucket* button.

![](CloudFormation49.png)

---

# 19. Conclusion

Weâ€™ve gone through how CloudFormation provides Infrastructure as Code.

Weâ€™ve gone through how CloudFormation supports parameters and outputs, as well as having native features like auto rollback and drift detection.

CloudFormation removes the hassle of managing AWS resources by providing code instead of manually creating them from the console.


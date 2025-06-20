const mongoose = require("mongoose")
const Section = require("../models/section")
const SubSection = require("../models/subSection")
const CourseProgress = require("../models/courseProgress")


// ================ update Course Progress ================
exports.updateCourseProgress = async (req, res) => {
  console.log("updateCourseProgress called with:", req.body)
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  console.log("Request data:", { courseId, subsectionId, userId })

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)
    console.log("Subsection found:", subsection ? "Yes" : "No")
    if (!subsection) {
      console.log("Invalid subsection ID:", subsectionId)
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("Course progress found:", courseProgress ? "Yes" : "No")

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      console.log("Course progress does not exist, creating new one")
      try {
        courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [subsectionId]
        })
        console.log("New course progress created:", courseProgress)
        return res.status(200).json({ message: "Course progress updated" })
      } catch (createError) {
        console.error("Error creating course progress:", createError)
        return res.status(500).json({ error: "Failed to create course progress" })
      }
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        console.log("Subsection already completed")
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId)
      console.log("Updated completedVideos:", courseProgress.completedVideos)
    }

    // Save the updated course progress
    await courseProgress.save()
    console.log("Course progress saved successfully")

    return res.status(200).json({ message: "Course progress updated" })
  }
  catch (error) {
    console.error("Error in updateCourseProgress:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}



// ================ get Progress Percentage ================
// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }

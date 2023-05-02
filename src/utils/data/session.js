export default function (session) {
  return {
    session: {
      uuid: session.uuid,
      // taskId: session.taskId,
      labId: session.labMeta.labId,
      // userUuid: session.userUuid,
      labName: session.labMeta.labName,
      startDateTime: session.startDateTime,
      createDateTime: session.startDateTime,
      // Not needed anymore
      // containerDefinition: session.containerDefinition,
      timer: session.labMeta.timer,
      ide: session.labMeta.ide,
      shell: session.labMeta.shell,
      basePorts: session.labMeta.basePorts,
      cDef: session.labMeta.cDef,
      achievements: session.labMeta.achievements,
      achievementsId: session.achievementsId,
      achievementsDebug: session.labMeta.achievementsDebug,
      integratedWebsite: session.labMeta.integratedWebsite,
      integratedWebsiteURL: session.labMeta.integratedWebsiteURL
    },
    isLabActive: true,
    isLabRunning: false,
    isLoaded: true,
    remainingMins: 0,
    readme: "",
    currentSlide: 1,
  };
}
